import React from 'react';
import MenuItems from 'src/modules/nav-bar/menu-items';

const SideMenu = ( props: any ): React.ReactElement => {
  return (
    <ul
      className='sidenav white Menu'
      id='mobile-demo'
      ref={props.sideNavRef}
      onClick={props.closeSideNav}>
      <MenuItems logo={props.logo} logout={props.logout} />
    </ul>
  );
};

export default SideMenu;
