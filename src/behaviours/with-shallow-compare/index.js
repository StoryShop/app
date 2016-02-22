import shallowCompare from 'react-addons-shallow-compare';

export default {
  shouldComponentUpdate ( nextProps, nextState ) {
    return shallowCompare( this, nextProps, nextState );
  },
};

