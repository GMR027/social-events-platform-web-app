import React, { useEffect, useState } from 'react';
import SystemCheck from 'src/modules/system-check/system-check';
import {
  useParams
} from 'react-router-dom';
import NavBar from 'src/modules/nav-bar/nav-bar';
import HorizontalSpace from 'src/modules/horizontal-space/horizontal-space';
import ActivateUserCall from 'src/pages/activate-user/activate-user-call';
import Footer from 'src/modules/footer/footer';

const ActivateUser = (): React.ReactElement => {
  const params: any = useParams();
  const [status, setStatus] = useState({
    success: false,
    message: ''
  });
  const token = params.token || null;

  useEffect(() => {
    ActivateUserCall( token )
      .then((data: any) => {
        setStatus({
          success: data.success,
          message: 'Cuenta activada exitosamente'
        });
      })
      .catch(() => {
        setStatus({
          success: false,
          message: 'Error activando la cuenta'
        });
      });
  }, [ActivateUserCall]);

  return (
    <>
      <NavBar />
      <HorizontalSpace size='large' />
      <p>{ status.success ? 'Cuenta activada correctamente' : status.message }</p>
      <Footer />
      <SystemCheck />
    </>
  );
};

export default ActivateUser;
