import React, {
  useRef
} from 'react';
import { Link } from 'react-router-dom';
import * as M from 'materialize-css';
import { useSelector } from 'react-redux';
import 'src/modules/nav-bar/nav-bar.scss';
import SideMenu from 'src/modules/nav-bar/side-menu';
import MenuItems from 'src/modules/nav-bar/menu-items';
import { SetUserData } from 'src/redux/actions/user-actions';
import { useDispatch } from 'react-redux';

const logoFile = '/assets/logo.png';

const NavBar = (): React.ReactElement => {
  const dispatch = useDispatch();
  const system = useSelector((state: any) => state.system);
  const prefix = system.platform.prefix;
  const logoURL = `${prefix}${logoFile}`;
  const sideNavRef: any = useRef(null);

  const closeSideNav = () => {
    const sideNav = M.Sidenav.getInstance(sideNavRef.current);
    sideNav.close();
  };

  const logout = (e: any) => {
    e.preventDefault();
    dispatch(SetUserData({user: null}));
  };

  return (
    <>
      <div className='navbar-fixed'>
        <nav className='white black-text'>
          <div className='nav-wrapper container'>
            <Link
              to='/'
              className='brand-logo Logo'
              style={{
                backgroundImage: `url(${logoURL})`
              }}>
            </Link>
            <a href='#'
              data-target='mobile-demo'
              className='sidenav-trigger cyan-text'>
              <i className='material-icons'>menu</i>
            </a>
            <ul id='nav-mobile' className='right hide-on-med-and-down Menu'>
              <MenuItems logout={logout} />
            </ul>
          </div>
        </nav>
      </div>
      <SideMenu
        sideNavRef={sideNavRef}
        closeSideNav={closeSideNav}
        logout={logout}
        logo={logoURL} />
    </>
  );
};

export default NavBar;
