import React from 'react';

export default {
  propTypes: {
    count: React.PropTypes.number.isRequired,
  },

  state: {
    pagination: {
      from: 0,
      to: 4,
      disabled: false,
    },
  },

  _checkPagination ( length ) {
    const disabled = length <= this.state.pagination.to + 1;
    this.setState({ pagination: { ...this.state.pagination, disabled }});
  },

  componentWillMount () {
    this._checkPagination( this.props.count );
  },

  componentWillReceiveProps ( nextProps ) {
    this._checkPagination( nextProps.count );
  },

  paginate () {
    if ( this.state.pagination.disabled ) {
      return;
    }

    const to = Math.min( this.state.pagination.to + 5, this.props.count - 1 );

    this.setState({
      pagination: {
        ...this.state.pagination,
        to,
        disabled: to >= this.props.count - 1,
      },
    }, () => this.modelRefetch() );
  },
};

