import { Observable } from 'rxjs/Observable';
import fromPromise from 'rxjs/add/observable/fromPromise';
import map from 'rxjs/add/operator/map';
import concatMap from 'rxjs/add/operator/concatMap';
import React from 'react';
import reactStamp from 'react-stamp';
import { Link } from 'react-router';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import WorldIcon from 'material-ui/lib/svg-icons/social/public';
import AddIcon from 'material-ui/lib/svg-icons/content/add';
import Avatar from 'material-ui/lib/avatar';
import connectToModel from 'behaviours/connect-to-model';
import DocumentTitle from 'react-document-title';
import MainMenu from 'components/main-menu';
import AppBar from 'components/app-bar';
import { FlexLayout } from 'components/flex';
import Prompt from 'components/prompt';
import * as themes from 'themes';
import * as paths from 'utils/paths';

export function modelToProps ( model, props ) {
  const { world_id } = props.params;
  const path = [ 'currentUser', 'worlds' ];

  const prefetchPaths = [
    [
      ...path,
      'length',
    ]
  ];

  return Observable.fromPromise( model.get( ...prefetchPaths ) )
    .concatMap( ({ json }) => {
      const { worlds } = json.currentUser;

      const paths = [
        [
          ...path,
          { from: 0, to: worlds.length },
          [
            '_id',
            'title',
            'slug',
          ]
        ]
      ];

      return model.get( ...paths, ...prefetchPaths ).then( v => v );
    })
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
    addWorld ( title ) {
      model.call([
        'currentUser',
        'worlds',
        'push',
      ], [ title ]);
    },
  };
}

export const App = ( React, ...behaviours ) => reactStamp( React ).compose({
  state: {
    mainMenuVisible: false,
    theme: themes.main,
    addingWorld: false,
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

  _promptForWorld () {
    this.setState({ addingWorld: true });
  },

  _addWorld ( title ) {
    this.props.addWorld( title );
  },

  render () {
    let {
      worlds = {},
      world_id,
      children,
    } = this.props;

    worlds = Object.getOwnPropertyNames( worlds )
      .filter( k => k.match( /^\d+$/ ) )
      .sort()
      .reverse()
      .map( k => worlds[k] )
      ;

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

    const worldList = (
      <FlexLayout direction="column" flex>
        {
          worldEls.length
            ? <List>{ worldEls }</List>
            : <p>You have no worlds. Click the "+" button to create one.</p>
        }

        <span flex />

        <FlexLayout direction="row">
          <span flex />
          <FloatingActionButton onClick={e => this._promptForWorld()}>
            <AddIcon />
          </FloatingActionButton>
          <Prompt
            okLabel='Create World'
            label='World Title'
            title='Create a New World'
            setValue={val=>this._addWorld( val )}
            open={this.state.addingWorld}
            onClose={e=>this.setState({ addingWorld: false })}
          />
        </FlexLayout>
      </FlexLayout>
    );

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
          <FlexLayout direction="column" element={<div style={styles.content} />} flex>
            {children || worldList }
          </FlexLayout>
        </FlexLayout>
      </DocumentTitle>
    );
  }
}, ...behaviours );

export default ( React, ...behaviours ) => connectToModel( React, modelToProps, actions, App( React, ...behaviours ) );

