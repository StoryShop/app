import reactStamp from 'react-stamp';
import Logger from 'utils/logger';
import FacebookLogin from 'react-facebook-login';

const log = Logger( 'FacebookSignInButton' );

export default ( React, ...behaviours ) => reactStamp( React ).compose({
  propTypes: {
    onSuccess: React.PropTypes.func.isRequired,
  },

  componentWillMount () {
     window.onFacebookResponse = response => this.onResponse( response );
  },

  componentWillUnmount () {
    delete window.onFacebookResponse;
  },

  render () {
    return (
      <FacebookLogin
        appId="231746590523625"
        callback={onFacebookResponse}
        icon="fa-facebook"
      />
    );
  },

  onResponse ( response ) {
    console.log( response );
    const token = response.accessToken;

    log.debug( `Logged in as: ${response.name} with token ${token}`);
    this.props.onSuccess( token );
  },

}, ...behaviours );