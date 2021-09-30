import React from 'react';
import { useSelector } from 'react-redux';
import * as M from 'materialize-css';
import EnvironmentVariables from 'src/constants/EnvironmentVariables';
import { Link } from 'react-router-dom';
import 'src/modules/footer/footer.scss';

const env = EnvironmentVariables.getInstance();
const isMobileApp = env.isMobileApp;

const Footer = (): React.ReactElement => {
  const system = useSelector((state: any) => state.system);

  return (
    <footer className='page-footer cyan darken-2 Footer'>
      <div className='footer-copyright Footer__copyright'>
        <div className='container Footer__info'>
          <div className='Footer__version'>
            <span onClick={() => {
              M.toast({
                html: `(${system.platform.os} - ${env.branchName})`,
                classes: 'rounded'
              });
            }}>V {env.version}&nbsp;</span>
            { !isMobileApp ?
              <a
                href='/static/app.apk'
                className='white-text Footer__app'>
                <span>-&nbsp;</span>
                <i className='material-icons'>android</i>
              </a> : null
            }
            &nbsp;-&nbsp;
            <Link
              to='/changelog'
              className='white-text Footer__app'>
              <i className='material-icons'>access_time</i>
            </Link>
          </div>
          <span className='white-text'>With ♥ by&nbsp;
            <a href='https://github.com/GMR027'
              className='white-text'
              target='_blank'
              rel='noreferrer'>
              Edgar
            </a>
            &nbsp;&&nbsp;
            <a href='https://github.com/christopherigm'
              className='white-text'
              target='_blank'
              rel='noreferrer'>
              Chris
            </a>
            &nbsp;G.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
