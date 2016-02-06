import React from 'react';

const WithFalcor = ( Component, resolve, ...paths ) => React.createClass({
  componentDidMount () {
    const { model } = this.props;

    model.get( ...paths ).subscribe( ({ json }) => {
      this.setState( resolve( json ) );
    });
  },

  render () {
    return <Component {...this.state} />;
  },
});

export default WithFalcor;

