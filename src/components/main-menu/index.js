import React from 'react';
import LeftNav from 'material-ui/lib/left-nav';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Avatar from 'material-ui/lib/avatar';

const MainMenu = ({ items, ...props }) => {
  const menuItems = items.map( ( item, idx ) => (
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
    <LeftNav className='main-menu' docked={false} {...props}>
      {/* TODO: World Selector */}

      <List>
        {menuItems}
        {/* TODO: flex spacing */}
        {/* TODO: <ListItem insetChildren={true} onTouchTap={() => false}>Your Account</ListItem> */}
      </List>
    </LeftNav>
  );
};
MainMenu.displayName = 'MainMenu';
MainMenu.propTypes = {
  items: React.PropTypes.array.isRequired,
};

export default MainMenu;

