export default ( state = {}, action ) => {
  switch ( action.type ) {
    case 'SET_TITLE':
      return {
        ...state,
        title: action.title,
      };
      break;
    case 'SET_THEME':
      return {
        ...state,
        theme: action.theme,
      };
      break;
    default:
      return state;
  }
};

