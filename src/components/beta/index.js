import store from 'stores/ui';
import history from 'stores/history';
import { clearAuthToken } from 'stores/actions/auth';

const styles = {
  betaWrap: {
    width: '50%',
    margin: '5% auto 0',
    padding: '2em',
    background: '#0e4254',
    borderRadius: '1em'
  },
  logoImg: {
    display: 'block',
    maxWidth: '80%',
    margin: '0 auto'
  },
  betaContent: {
    marginTop: '2em',
    padding: '1em',
    background: 'white',
    fontFamily: 'Roboto, sans-serif',
    fontSize: '1.4em',
    borderRadius: '1em'
  }
};

export default React => () => {
  const logout = e => {
    e.preventDefault();
    store.dispatch( clearAuthToken() );
    history.push( '/' );
  };

  return (
    <div style={styles.betaWrap}>
      <div>
        <img style={styles.logoImg} src="http://getstoryshop.com/img/logo.png" />
        <div style={styles.betaContent}>
          <p>StoryShop is currently in private beta.</p>
          <p>
            If you are a beta user and believe you are seeing this message in error, please be
            sure to check the app status at
            <a href="http://status.storyshopapp.com">http://status.storyshopapp.com</a>,
            before contacting us for support through
            <a href="http://feedback.storyshopapp.com">http://feedback.storyshopapp.com</a>.
            Thank you!
          </p>
          <p>
            <a href="#" onClick={logout}>Log Out</a>
          </p>
        </div>
      </div>
    </div>
  );
};

