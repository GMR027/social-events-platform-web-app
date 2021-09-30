import React from 'react';
import SystemCheck from 'src/modules/system-check/system-check';
import NavBar from 'src/modules/nav-bar/nav-bar';
import Footer from 'src/modules/footer/footer';
import ChangeLog from 'src/modules/changelog/changelog';

const ChangeLogPage = (): React.ReactElement => {
  return (
    <>
      <NavBar />
      <ChangeLog />
      <Footer />
      <SystemCheck />
    </>
  );
};

export default ChangeLogPage;
