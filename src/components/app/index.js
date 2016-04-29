import { Observable } from 'rx';
import React from 'react';
import reactStamp from 'react-stamp';
import connectToModel from 'behaviours/connect-to-model';
import DocumentTitle from 'react-document-title';
import MainMenu from 'components/main-menu';
import AppBar from 'components/app-bar';
import { FlexLayout } from 'components/flex';
import * as themes from 'themes';

function modelToProps ( model, props ) {
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
        worlds,
      };
    })
    ;
}

function actions ( model ) {
  return {
  };
}

export default ( React, ...behaviours ) => connectToModel( React, modelToProps, actions, reactStamp( React ).compose({
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
    const worlds = this.props.worlds;

    // TODO: Placeholder for calculated value
    const currentWorld = worlds ? worlds[0] : null;

    // const activeItem = menuItems.find( item => item.active );
    const title = `${this.state.title} | StoryShop`;

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

    return (
      <DocumentTitle title={title}>
        <FlexLayout direction="column" style={styles.container}>
          {/* use flex for full height */}
          <AppBar
            title={this.state.title}
            onLeftIconButtonTouchTap={() => this._toggleMenu( true )}
          />
          <MainMenu
            open={this.state.mainMenuVisible}
            onRequestChange={this._toggleMenu.bind(this)}
            worlds={worlds}
            currentWorld={currentWorld}
          />
          <div style={styles.content} flex>
            {this.props.children}
          </div>
        </FlexLayout>
      </DocumentTitle>
    );
  }
}, ...behaviours ));

