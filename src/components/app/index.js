import reactStamp from 'react-stamp';
import DocumentTitle from 'react-document-title';
import MainMenu from 'components/main-menu';
import AppBar from 'components/app-bar';
import defaultTheme from 'themes';

export default ( React, ...behaviours ) => reactStamp( React ).compose({
  displayName: 'App',

  state: {
    mainMenuVisible: false,
    loading: true,
  },

  muiTheme () {
    return defaultTheme;
  },

  modelPaths () {
    return [
      [
        'currentUser',
        'worlds',
        { from: 0, to: 10 },
        [
          'id',
          'title',
          'slug',
        ]
      ],
    ];
  },

  modelToState ( data ) {
    // TODO: handle errors

    return {
      loading: false,
      worlds: data.currentUser.worlds,
    };
  },

  mapUiState ( uiState ) {
    return {
      title: uiState.meta.title,
    };
  },

  _toggleMenu ( state ) {
    this.setState({
      mainMenuVisible: state,
    });
  },

  render () {
    const worlds = this.state.worlds;

    // TODO: Placeholder for calculated value
    const currentWorld = worlds ? worlds[0] : null;

    // const activeItem = menuItems.find( item => item.active );
    const title = `${this.state.title} | StoryShop`;

    return (
      <DocumentTitle title={title}>
        <div>
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
          <div>{this.props.children}</div>
        </div>
      </DocumentTitle>
    );
  }
}, ...behaviours );

