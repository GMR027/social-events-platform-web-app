import React, {
  useState
} from 'react';
import HorizontalSpace from 'src/modules/horizontal-space/horizontal-space';
import EmailLogin from 'src/modules/login/email-login';
import FacebookLoginComponent from 'src/modules/login/facebook-login';
import { useSelector } from 'react-redux';
import ParallaxHeaderImage from 'src/modules/parallax-header-image/parallax-header-image';

const headerPictureFile = '/assets/login.jpg';

const LoginUser = (): React.ReactElement => {
  const [isLoading, setIsLoading] = useState(false);
  const system = useSelector((state: any) => state.system);
  const prefix = system.platform.prefix;
  const headerPictureURL = `${prefix}${headerPictureFile}`;

  return (
    <>
      <ParallaxHeaderImage
        image={headerPictureURL}
        gradientOpacity='0.2'
        size='x-small'
        title='Login' />
      <div className='container row LoginUser'>
        <div className='col m1 l2'></div>
        <div className='col s12 m10 l8 row'>
          <div className='col s12'><HorizontalSpace size='medium' /></div>
          <FacebookLoginComponent isLoading={isLoading} setIsLoading={setIsLoading} />
          <div className='col s12'><HorizontalSpace size='medium' /></div>
          <EmailLogin isLoading={isLoading} setIsLoading={setIsLoading} />
        </div>
        <div className='col m1 l2'></div>
      </div>
    </>
  );
};

export default LoginUser;
