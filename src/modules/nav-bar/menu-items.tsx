import React from 'react';

const MenuItems = ( props: any ): React.ReactElement => {
  return (
    <>
      <li>
        <em
          className='SideNavBar__logo hide-on-large-only'style={{
          backgroundImage: `url(${props.logo})`
        }}></em>
      </li>
    </>
  );
};

export default MenuItems;
