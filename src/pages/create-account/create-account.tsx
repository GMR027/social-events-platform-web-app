import React from 'react';
import SystemCheck from 'src/modules/system-check/system-check';
import NavBar from 'src/modules/nav-bar/nav-bar';
import Footer from 'src/modules/footer/footer';
import RegisterUser from 'src/modules/register-user/register-user';

const CreateAccount = (): React.ReactElement => {
  return (
    <>
      <NavBar />
      <RegisterUser />
      <Footer />
      <SystemCheck />
    </>
  );
};

export default CreateAccount;

