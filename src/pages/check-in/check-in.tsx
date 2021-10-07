import React, {
  useState
} from 'react';
import SystemCheck from 'src/modules/system-check/system-check';
import CheckIn from 'src/modules/check-in/check-in';
import NavBar from 'src/modules/nav-bar/nav-bar';
import Footer from 'src/modules/footer/footer';

const CheckInPage = (): React.ReactElement => {
  const [logo, setLogo] = useState(null);
  const [logoURL, setLogoURL] = useState(null);

  return (
    <>
      <NavBar logo={logo} logoURL={logoURL} />
      <CheckIn setLogo={setLogo} setLogoURL={setLogoURL} />
      <SystemCheck />
      <Footer />
    </>
  );
};

export default CheckInPage;
