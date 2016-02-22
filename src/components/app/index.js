import React from 'react';
import reactStamp from 'react-stamp';
import withTheme from 'behaviours/with-theme';
import withShallowCompare from 'behaviours/with-shallow-compare';
import defaultTheme from 'themes';
import AppBar from 'components/app-bar';
import MainMenu from 'components/main-menu';
import { ColorManipulator } from 'material-ui/lib/utils';
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme';
import DocumentTitle from 'react-document-title';
import WorldIcon from 'material-ui/lib/svg-icons/social/public';
import CharacterIcon from 'material-ui/lib/svg-icons/social/person';
import ElementsIcon from 'material-ui/lib/svg-icons/action/dashboard';
import OutlineIcon from 'material-ui/lib/svg-icons/editor/format-list-numbered';

export const App = reactStamp( React ).compose({
  displayName: 'App',

  contextTypes: {
    router: React.PropTypes.object,
  },

  state: {
    mainMenuVisible: false,
  },

  _toggleMenu ( state ) {
    this.setState({
      mainMenuVisible: state,
    });
  },

  _go ( uri ) {
    this.context.router.push( uri );
    this._toggleMenu( false );
  },

  render () {
    const { router } = this.context;
    const theme = getMuiTheme( defaultTheme );
    const activeColour = ColorManipulator.fade( theme.rawTheme.palette.textColor, 0.2 );

    const menuItems = [
      {
        slug: '',
        label: 'World Settings',
        icon: <WorldIcon />,
      },
      {
        slug: 'elements',
        label: 'Elements',
        icon: <ElementsIcon />,
      },
      {
        slug: 'characters',
        label: 'Characters',
        icon: <CharacterIcon />,
      },
      {
        slug: 'outlines',
        label: 'Outlines',
        icon: <OutlineIcon />,
      },
    ]
    .map( item => ({ uri: `/worlds/123/${item.slug}`, ...item }) )
    .map( item => {
      const active = router.isActive( item.uri, true );

      item = {
        active,
        props: {
          onTouchTap: () => this._go( item.uri ),
          style: {
          },
        },
        ...item
      };

      if ( active ) {
        item.props.style.backgroundColor = activeColour;
      }

      return item;
    });

    const activeItem = menuItems.find( item => item.active );
    const title = activeItem ? `${activeItem.label} | StoryShop` : 'StoryShop'

    return (
      <DocumentTitle title={title}>
        <div>
          {/* use flex for full height */}
          <AppBar
            title={activeItem ? activeItem.label : title}
            onLeftIconButtonTouchTap={() => this._toggleMenu( true )}
          />
          <MainMenu
            open={this.state.mainMenuVisible}
            onRequestChange={this._toggleMenu.bind(this)}
            items={menuItems}
          />
          <div>{this.props.children}</div>
        </div>
      </DocumentTitle>
    );
  }
}, withTheme( defaultTheme ), withShallowCompare );

export default App;

