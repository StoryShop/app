import fetchPolyfill from 'whatwg-fetch';
import history from 'stores/history';
import store from 'stores/ui';

export const setTokenSuccess = ( provider, token ) => ({
  type: 'SET_AUTH_TOKEN_SUCCESS',
  token,
  provider,
});

export const setTokenError = error => ({
  type: 'SET_AUTH_TOKEN_ERROR',
  error,
});

export const setToken = ( provider, token ) => dispatch => {
  dispatch({
    type: 'SET_AUTH_TOKEN_START'
  });

  return fetch( STORYSHOP_API_URI + '/api/auth/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token, provider }),
  })
  .then( res => {
    if ( res.status !== 200 ) {
      return Promise.reject();
    }

    return res.json();
  })
  .then( data => dispatch( setTokenSuccess( provider, data.token ) ) )
  .then( () => history.push( '/app' ) )
  .catch( err => {
    dispatch( setTokenError( err ) );
    history.push( '/beta' );
  })
  ;
};

