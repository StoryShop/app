import React from 'react';
import reactStamp from 'react-stamp';
import LeftNav from 'material-ui/lib/left-nav';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Avatar from 'material-ui/lib/avatar';
import WorldIcon from 'material-ui/lib/svg-icons/social/public';
import CharacterIcon from 'material-ui/lib/svg-icons/social/person';
import ElementsIcon from 'material-ui/lib/svg-icons/action/dashboard';
import OutlineIcon from 'material-ui/lib/svg-icons/editor/format-list-numbered';
import { ColorManipulator } from 'material-ui/lib/utils';
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme';
import defaultTheme from 'themes';

export default reactStamp( React ).compose({
  displayName: 'MainMenu',

  propTypes: {
    worlds: React.PropTypes.object,
    currentWorld: React.PropTypes.object,
  },

  contextTypes: {
    router: React.PropTypes.object,
  },

  state: {
    isVisible: false,
  },

  _go ( uri ) {
    this.context.router.push( uri );
    this._toggleMenu( false );
  },

  _isCurrentUri ( uri ) {
    return this.context.router.isActive( uri, true );
  },

  _toggleMenu ( state ) {
    this.props.onRequestChange( state );
  },

  render () {
    const { worlds, currentWorld, open, ...props } = this.props;

    /**
     * If there is no current world, there is nothing to render.
     */
    if ( ! currentWorld ) {
      return null;
    }

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
    .map( item => ({ uri: `/worlds/${currentWorld.id}/${item.slug}`, ...item }) )
    .map( item => {
      const active = this._isCurrentUri( item.uri, true );

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
    })
    .map( ( item, idx ) => (
      <ListItem
        key={idx}
        className={`main-menu__item-${item.slug}`}
        linkButton={true}
        insetChildren={true}
        leftAvatar={<Avatar icon={item.icon} />}
        primaryText={item.label}
        {...item.props}
      />
    ));

    return (
      <LeftNav
        className='main-menu'
        docked={false}
        open={open}
        onRequestChange={this._toggleMenu.bind(this)}
        {...props}
        >
        {/* TODO: World Selector */}

        <List>
          {menuItems}
          {/* TODO: flex spacing */}
          {/* TODO: <ListItem insetChildren={true} onTouchTap={() => false}>Your Account</ListItem> */}
        </List>
      </LeftNav>
    );
  },
});

