import React from 'react';
import reactStamp from 'react-stamp';
import LeftNav from 'material-ui/lib/left-nav';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Divider from 'material-ui/lib/divider';
import Avatar from 'material-ui/lib/avatar';
import WorldListIcon from 'material-ui/lib/svg-icons/places/all-inclusive';
import WorldIcon from 'material-ui/lib/svg-icons/social/public';
import CharacterIcon from 'material-ui/lib/svg-icons/social/person';
import ElementsIcon from 'material-ui/lib/svg-icons/action/dashboard';
import OutlineIcon from 'material-ui/lib/svg-icons/editor/format-list-numbered';
import FeedbackIcon from 'material-ui/lib/svg-icons/action/feedback';
import { ColorManipulator } from 'material-ui/lib/utils';
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme';
import * as themes from 'themes';
import * as paths from 'utils/paths';

export default reactStamp( React ).compose({
  displayName: 'MainMenu',

  propTypes: {
    worlds: React.PropTypes.array,
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
    const styles = {
      link: {
        color: 'rgba(0, 0, 0, 0.870588)',
        textDecoration: 'none',
      },
    };

    /**
     * If there is no current world, there is nothing to render.
     */
    if ( ! currentWorld ) {
      return null;
    }

    const theme = getMuiTheme( themes.main );
    const activeColour = ColorManipulator.fade( theme.rawTheme.palette.textColor, 0.2 );

    const menuItems = [
      {
        slug: 'characters',
        label: 'Characters',
        icon: <CharacterIcon />,
        uri: paths.characterList( currentWorld._id, currentWorld.title ),
        colour: themes.characters.palette.primary1Color,
      },
      {
        slug: 'elements',
        label: 'Elements',
        icon: <ElementsIcon />,
        uri: paths.elementList( currentWorld._id, currentWorld.title ),
        colour: themes.elements.palette.primary1Color,
      },
      {
        slug: 'outlines',
        label: 'Outlines',
        icon: <OutlineIcon />,
        uri: paths.outlineList( currentWorld._id ),
        colour: themes.outlines.palette.primary1Color,
      },
      {
        slug: '',
        label: 'World Settings',
        icon: <WorldIcon />,
        uri: paths.world( currentWorld._id, currentWorld.title ),
        colour: themes.main.palette.primary1Color,
      },
    ]
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
        leftAvatar={<Avatar backgroundColor={item.colour} icon={item.icon} />}
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
          <Divider />
          <ListItem
            className='main-menu__item-worlds'
            linkButton={true}
            insetChildren={true}
            leftAvatar={<Avatar backgroundColor={themes.main.palette.primary1Color} icon={<WorldListIcon />} />}
            primaryText='All Worlds'
            onTouchTap = { e => this._go( paths.worldList() ) }
          />
          <Divider />
          <ListItem
            className='main-menu__item-feedback'
            linkButton={true}
            insetChildren={true}
            leftAvatar={<Avatar backgroundColor={themes.main.palette.accent1Color} icon={<FeedbackIcon />} />}
            primaryText={<a href={paths.feedback()} target="_blank" style={styles.link}>Give Feedback</a>}
          />
        </List>
      </LeftNav>
    );
  },
});
