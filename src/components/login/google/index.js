import reactStamp from 'react-stamp';
import Logger from 'utils/logger';

const log = Logger( 'GoogleSignInButton' );

export default ( React, ...behaviours ) => reactStamp( React ).compose({
  propTypes: {
    onSuccess: React.PropTypes.func.isRequired,
  },

  componentDidMount () {
    window.onGoogleSignInSuccess = user => this.onLoginSuccess( user );
    window.onGoogleSignInFailure = err => this.onLoginError( err );
  },

  componentWillUnmount () {
    delete window.onGoogleSignInSuccess;
    delete window.onGoogleSignInFailure;
  },

  render () {
    return (
      <div
        className='g-signin2'
        data-longtitle={ true }
        data-width={ 240 }
        data-height={ 50 }
        data-theme='dark'
        data-onsuccess='onGoogleSignInSuccess'
        data-onfailure='onGoogleSignInFailure'
      />
    );
  },

  onLoginSuccess ( user ) {
    const profile = user.getBasicProfile();
    const token = user.getAuthResponse().id_token;

    log.debug( `Logged in as: ${profile.getName()} with token ${token}` );
    this.props.onSuccess( token );
  },

  onLoginError ( error ) {
    log.warn( 'Something went horribly wrong', error );
  },
}, ...behaviours );

