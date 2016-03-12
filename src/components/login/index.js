import reactStamp from 'react-stamp';
import DocumentTitle from 'react-document-title';
import { Redirect } from 'react-router';
import Paper from 'material-ui/lib/paper';
import { FlexLayout } from 'components/flex';
import GoogleSignInButtonFactory from './google';
import withShallowCompare from 'behaviours/with-shallow-compare';
import { setToken } from 'stores/actions/auth';
import store from 'stores/ui';

export default ( React, ...behaviours ) => reactStamp( React ).compose({
  onLoginSuccess ( provider, token ) {
    store.dispatch( setToken( provider, token ) );
  },

  render () {
    const styles = {
      h1: {
        margin: 0,
      },

      container: {
        padding: 20,
      },

      buttonContainer: {
        marginTop: 20,
      },
    };

    const GoogleSignInButton = GoogleSignInButtonFactory( React, withShallowCompare );

    return (
      <DocumentTitle title='Login'>
        <FlexLayout
          element={<Paper style={styles.container} />}
          direction='column'
          alignItems='center'
          alignContent='center'
          justifyContent='center'
          >
          <h1 style={styles.h1}>Login</h1>

          <FlexLayout
            direction='column'
            margin={10}
            alignItems='center'
            alignContent='center'
            justifyContent='center'
            style={styles.buttonContainer}
            >

            <GoogleSignInButton
              onSuccess={ t => this.onLoginSuccess( 'google', t )}
            />
          </FlexLayout>
        </FlexLayout>
      </DocumentTitle>
    );
  },
}, ...behaviours );

