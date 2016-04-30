import { Observable } from 'rxjs/Observable';
import fromPromise from 'rxjs/add/observable/fromPromise';
import map from 'rxjs/add/operator/map';
import concatMap from 'rxjs/add/operator/concatMap';
import React from 'react';
import reactStamp from 'react-stamp';
import { Link } from 'react-router';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import WorldIcon from 'material-ui/lib/svg-icons/social/public';
import Avatar from 'material-ui/lib/avatar';
import connectToModel from 'behaviours/connect-to-model';
import DocumentTitle from 'react-document-title';
import MainMenu from 'components/main-menu';
import AppBar from 'components/app-bar';
import { FlexLayout } from 'components/flex';
import * as themes from 'themes';
import * as paths from 'utils/paths';

export function modelToProps ( model, props ) {
  const { world_id } = props.params;
  const paths = [
    [
      'currentUser',
      'worlds',
      { from: 0, to: 10 },
      [
        '_id',
        'title',
        'slug',
      ]
    ]
  ];

  return Observable.fromPromise( model.get( ...paths ) )
    .map( ({ json }) => {
      const { worlds } = json.currentUser;

      return {
        world_id,
        worlds,
      };
    })
    ;
}

export function actions ( model ) {
  return {
  };
}

export const App = ( React, ...behaviours ) => reactStamp( React ).compose({
  state: {
    mainMenuVisible: false,
    theme: themes.main,
  },

  muiTheme () {
    return this.state.theme;
  },

  mapUiState ( uiState ) {
    return {
      title: uiState.meta.title,
      theme: themes[ `${uiState.meta.theme}` ] || themes.main,
    };
  },

  _toggleMenu ( state ) {
    this.setState({
      mainMenuVisible: state,
    });
  },

  render () {
    let {
      worlds = {},
      world_id,
      children,
    } = this.props;

    worlds = Object.getOwnPropertyNames( worlds ).map( k => worlds[k] );

    let currentWorld;

    if ( world_id ) {
      currentWorld = worlds.find( w => w._id === world_id );
    }

    const title = currentWorld ? this.state.title : 'My Worlds';

    const styles = {
      container: {
        fontFamily: 'Roboto, sans-serif',
        width: '100%',
        height: '100%',
      },

      content: {
        width: '100%',
        maxWidth: '1300px',
        margin: '0 auto',
        padding: '20px',
      },
    };

    const worldEls = worlds.map( world => (
      <ListItem key={world._id}
        leftAvatar={<Avatar icon={<WorldIcon />} />}
        containerElement={<Link to={paths.world(world._id)} />}
        primaryText={world.title}
      />
    ));

    return (
      <DocumentTitle title={`${title} | StoryShop`}>
        <FlexLayout direction="column" style={styles.container}>
          {/* use flex for full height */}
          <AppBar
            title={title}
            currentWorld={currentWorld}
            onLeftIconButtonTouchTap={() => this._toggleMenu( true )}
          />
          <MainMenu
            open={this.state.mainMenuVisible}
            onRequestChange={this._toggleMenu.bind(this)}
            worlds={worlds}
            currentWorld={currentWorld}
          />
          <div style={styles.content} flex>
            {children || <List>{ worldEls }</List>}
          </div>
        </FlexLayout>
      </DocumentTitle>
    );
  }
}, ...behaviours );

export default ( React, ...behaviours ) => connectToModel( React, modelToProps, actions, App( React, ...behaviours ) );

