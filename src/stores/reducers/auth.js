export default ( state = {}, action ) => {
  switch ( action.type ) {
    case 'SET_AUTH_TOKEN_SUCCESS':
      return {
        ...state,
        provider: action.provider,
        token: action.token,
      };
      break;

    case 'CLEAR_AUTH_TOKEN':
      return {};
      break;

    default:
      return state;
  }
};

