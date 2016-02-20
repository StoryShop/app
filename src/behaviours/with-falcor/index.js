import React from 'react';
import model from 'model';

const WithFalcor = ( Component, resolve, ...paths ) => React.createClass({
  displayName: `${Component.displayName || 'UnnamedComponent'}WithFalcor`,

  componentDidMount () {
    model.get( ...paths ).subscribe( ({ json }) => {
      this.setState( resolve( json ) );
    });
  },

  render () {
    return <Component {...this.state} {...this.props} />;
  },
});

export default WithFalcor;

