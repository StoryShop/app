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
  },
  logoutButton: {
    display: 'inline-block',
    background: '#892353',
    color: '#fff',
    padding: '16px',
    borderRadius: '2px',
    border: '1px solid transparent',
    fontSize: '18px',
    fontWeight: 'bold',
    fontFamily: 'Roboto'
  },
  buttonWrap: {
    textAlign: 'center',
    marginBottom: '24px'
  },
  plain: {
    fontSize: '16px',
    lineHeight: '1.4'
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
          <p style={styles.plain}>StoryShop is currently in private beta. To find out more, please visit <a href="http://getstoryshop.com">http://getstoryshop.com</a>
          </p>
          <hr />
          <div style={styles.buttonWrap}>
            <p style={styles.plain}>Beta Users - Try This First:</p>
            <button style={styles.logoutButton} onClick={logout}>Log Out of StoryShop</button>
          </div>
          <hr />
          <p style={styles.plain}>
            If you are a beta user, and logging out then back in only leads you back here, the next step is to de-authorize your Google account, then try once more to log in:
          </p>
          <p style={styles.plain}>
            <a href="https://security.google.com/settings/security/permissions">https://security.google.com/settings/security/permissions</a>
          </p>
          <p style={styles.plain}>
            Users with multiple Google accounts, please be careful to make sure you are using the exact Google address tied to your StoryShop account for logging in, including capitalization & any punctuation, as others will not work.
          </p>
          <p style={styles.plain}>
            Please be sure to check the app status at <a href="http://status.storyshopapp.com">http://status.storyshopapp.com</a>, before contacting us for support through <a href="http://feedback.storyshopapp.com">http://feedback.storyshopapp.com</a>. Thank you!
          </p>
        </div>
      </div>
    </div>
  );
};

