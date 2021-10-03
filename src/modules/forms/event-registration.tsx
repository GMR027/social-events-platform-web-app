import React from 'react';
import { APIPost } from 'src/api/communicator';
import HorizontalSpace from 'src/modules/horizontal-space/horizontal-space';
import EventRegistrationForm from 'src/modules/forms/components-forms/event-registration-form';

const EventRegistration = (props: any): React.ReactElement => {

  const registerUserAPICall = (data: any) => {
    APIPost('user-registrations/', data)
      .then((response: any) => {
        console.log('>>>> response', response);
      })
      .catch((error: any) => {
        console.log('>>>> error', error.toString(), error, data);
      });
  };

  return (
    <div className='EventRegistration'>
      <HorizontalSpace size='small' />
      <div className='container'>
        <div className='col s1 hide-on-small-only'></div>
        <EventRegistrationForm
          eventId={props.eventId}
          responsiveLetter={props.responsiveLetter}
          registerUserAPICall={registerUserAPICall} />
        <div className='col s1 hide-on-small-only'></div>
      </div>
    </div>
  );
};

export default EventRegistration;
