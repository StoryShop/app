export default ( state = {}, action ) => {
  switch ( action.type ) {
    case 'SET_TITLE':
      return {
        ...state,
        title: action.title,
      };
      break;
    default:
      return state;
  }
};

