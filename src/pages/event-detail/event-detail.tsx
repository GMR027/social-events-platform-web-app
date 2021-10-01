import React from 'react';
import SystemCheck from 'src/modules/system-check/system-check';
import NavBar from 'src/modules/nav-bar/nav-bar';
import HorizontalSpace from 'src/modules/horizontal-space/horizontal-space';
import Footer from 'src/modules/footer/footer';
import EventDetail from 'src/modules/events/event-detail';

const EventDetailPage = (): React.ReactElement => {
  return (
    <>
      <NavBar />
      <EventDetail/>
      <HorizontalSpace size='small'/>
      <Footer />
      <SystemCheck />
    </>
  );
};

export default EventDetailPage;
