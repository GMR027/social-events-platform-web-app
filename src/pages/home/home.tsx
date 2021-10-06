import React, { useEffect, useState } from 'react';
import SystemCheck from 'src/modules/system-check/system-check';
import NavBar from 'src/modules/nav-bar/nav-bar';
import HorizontalSpace from 'src/modules/horizontal-space/horizontal-space';
import Footer from 'src/modules/footer/footer';
import ParallaxHeaderImage from 'src/modules/parallax-header-image/parallax-header-image';
import EventsGrid from 'src/modules/events/events-grid';
import fetchData from 'src/modules/utils/fetch-data';
import { useSelector } from 'react-redux';

const eventsData = {
  data: []
};
const logoFile = '/assets/logo.png';

const Home = (): React.ReactElement => {
  const system = useSelector((state: any) => state.system);
  const prefix = system.platform.prefix;
  const logoURL = `${prefix}${logoFile}`;
  const [events, setEvent] = useState(eventsData);

  useEffect(() => {
    fetchData('events/?filter[private]=false')
    .then((response: any) => {
      if (response.data.length === 0) {
        console.log('Error, no existe evento');
      } else {
        const events = response;
        console.log('Eventos', events);
        setEvent(events);
      }
    })
    .catch((error) => {
      console.log('Hubo un error', error);
    });
  }, [fetchData]);

  return (
    <>
      <NavBar logo={logoURL} />
      <ParallaxHeaderImage
        size='xx-small'
        image='https://images.unsplash.com/photo-1552297777-dacae7d2b894?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80'
        title='Eventos' />
      <HorizontalSpace size='small' />
      <div className='container row'>
        <EventsGrid
          events={events}/>
      </div>
      <HorizontalSpace size='small' />
      <Footer />
      <SystemCheck />
    </>
  );
};

export default Home;
