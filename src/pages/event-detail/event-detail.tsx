import React from 'react';
import SystemCheck from 'src/modules/system-check/system-check';
import NavBar from 'src/modules/nav-bar/nav-bar';
import Footer from 'src/modules/footer/footer';
import EventDetail from 'src/modules/events/event-detail';

const EventDetailPage = (): React.ReactElement => {
  return (
    <>
      <NavBar />
      <EventDetail/>
      <Footer />
      <SystemCheck />
    </>
  );
};

export default EventDetailPage;
