import React, {
  useState
} from 'react';
import SystemCheck from 'src/modules/system-check/system-check';
import NavBar from 'src/modules/nav-bar/nav-bar';
import Footer from 'src/modules/footer/footer';
import EventDetail from 'src/modules/events/event-detail';

const EventDetailPage = (): React.ReactElement => {
  const [logo, setLogo] = useState(null);
  const [logoURL, setLogoURL] = useState(null);

  return (
    <>
      <NavBar logo={logo} logoURL={logoURL} />
      <EventDetail setLogo={setLogo} setLogoURL={setLogoURL} />
      <Footer />
      <SystemCheck />
    </>
  );
};

export default EventDetailPage;
