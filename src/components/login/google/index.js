import reactStamp from 'react-stamp';
import GoogleLogin from 'react-google-login';
import Logger from 'utils/logger';

const log = Logger( 'GoogleSignInButton' );

export default ( React, ...behaviours ) => reactStamp( React ).compose({
  propTypes: {
    onSuccess: React.PropTypes.func.isRequired,
  },

  render () {
    return (
      <GoogleLogin
        clientId="193808009792-mfs2m81hl3t3s6154sqt028r2g7j4724.apps.googleusercontent.com"
        scope="profile email"
        buttonText="Login with Google"
        callback={u => this.onLoginSuccess( u )}
      />
    );
  },

  onLoginSuccess ( user ) {
    const profile = user.getBasicProfile();
    const token = user.getAuthResponse().id_token;

    log.debug( `Logged in as: ${profile.getName()} with token ${token}` );
    this.props.onSuccess( token );
  },
}, ...behaviours );

