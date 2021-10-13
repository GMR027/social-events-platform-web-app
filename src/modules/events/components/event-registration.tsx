import React, {
  useState,
  useRef
} from 'react';
import { APIPost } from 'src/api/communicator';
import HorizontalSpace from 'src/modules/horizontal-space/horizontal-space';
import EventRegistrationForm from 'src/modules/events/components/event-registration-form';
import EventGetBadgeForm from 'src/modules/events/components/event-get-badge-form';
// import EventUpdateRegistrationForm from 'src/modules/events/components/event-update-registration-form';
import 'src/modules/events/components/event-registration.scss';
import Modal from 'src/modules/modal/modal';
import LoadingModal from 'src/modules/loading-modal/loading-modal';

const modelInterface = {
  open: () => null,
  close: () => null
};

const EventRegistration = (props: any): React.ReactElement => {
  const [isLoading, setIsLoading] = useState(false);
  const regFormRef: any = useRef(null);
  const badgeFormRef: any = useRef(null);
  const [modal, setModal] = useState(modelInterface);
  const [loadingModal, setLoadingModal] = useState(modelInterface);
  const [modalSuccess, setModalSuccess] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModaMessage] = useState('');
  const [loadingModalTitle, setLoadingModalTitle] = useState('');
  const [loadingModalMessage, setLoadingModalMessage] = useState('');
  const eventName = props.event.attributes.title;

  const onCloseEnd = () => {
    modal.close();
  };

  const getBadgeAPICall = (data: any) => {
    const email = data.data.attributes.email;
    if ( !email ) {
      setModalSuccess(false);
      setModalTitle('Error');
      setModaMessage('Por favor ingrese su correo electronico.<br><br>Gracias.');
      return modal.open();
    }
    setLoadingModalTitle('Buscando gafete');
    setLoadingModalMessage(`Un momento por favor, estamos buscando
      su gafete virtual para el evento <b>${eventName}</b>.
      Por favor no actualize esta pantalla.
    `);
    loadingModal.open();
    setIsLoading(true);
    APIPost('retrieve-badge/', data)
    .then(() => {
      setIsLoading(false);
      loadingModal.close();
      badgeFormRef.current.reset();
      setModalSuccess(true);
      setModalTitle('Gafete encontrado!');
      setModaMessage(`Hemos encontrado su gafete virtual para el evento <b>${eventName}</b>.<br/><br/>
        Le hemos enviado un correo electronico a: <b>${email}</b>. con el enlace para
        que used pueda acceder a su gafete electronico en todo momento.<br/><br/>
        Gracias.
      `);
      modal.open();
    })
    .catch(() => {
      setIsLoading(false);
      loadingModal.close();
      setModalSuccess(false);
      setModalTitle('Error encontrado su gafete');
      setModaMessage(`Nuestros registros indican que usted no tiene ningun gafete para
        el evento <b>${props.eventName}</b>.
        <br/><br/>Por favor verifique su correo electronico o use el formulario de esta
        pagina para registarse a este evento.
        <br/><br/>Si sigue teniendo inconvenientes para recuperar su gafete, por favor contacte
        a nuestro equipo de soporte tecnico en el siguiente correo electronico:
        <a href="mailto:christopher.guzman.monsalvo@gmail.com">christopher.guzman.monsalvo@gmail.com</a><br/><br/>
        Gracias.
      `);
      modal.open();
    });
  };

  const registerUserAPICall = (data: any) => {
    const attr = data.data.attributes;
    if ( !attr.first_name || !attr.last_name || !attr.city ||
          !attr.email || !attr.phone ) {
      setModalSuccess(false);
      setModalTitle('Error');
      setModaMessage('Por favor llene todos los campos requeridos marcados con * <br><br>Gracias.');
      return modal.open();
    }
    setLoadingModalTitle('Registrando usuario');
    setLoadingModalMessage(`Un momento por favor lo estamos registrando para el evento <b>${eventName}</b>.
      Por favor no actualize esta pantalla.
    `);
    loadingModal.open();
    setIsLoading(true);
    APIPost('user-registrations/', data)
      .then(() => {
        setIsLoading(false);
        loadingModal.close();
        regFormRef.current.reset();
        setModalSuccess(true);
        setModalTitle('Registro exitoso!');
        setModaMessage(`${attr.first_name}, usted se ha registrado exitosamente al evento <b>${eventName}</b>.<br/><br/>
          Le hemos enviado un correo electronico a: <b>${attr.email}</b>. con el enlace para
          que used pueda acceder a su gafete electronico en todo momento.<br/><br/>
          Gracias.
        `);
        modal.open();
      })
      .catch(() => {
        setIsLoading(false);
        loadingModal.close();
        setModalSuccess(false);
        setModalTitle('Error procesando su registro');
        setModaMessage(`${attr.first_name}, ha ocurrido un error al intentar registrar su informacion
          para el evento <b>${eventName}</b>.
          <br/><br/>Por favor verifique no se haya registrado previamente a este evento.
          <br/><br/>Si sigue teniendo inconvenientes con el registro a este evento, por favor contacte
          a nuestro equipo de soporte tecnico en el siguiente correo electronico:
          <a href="mailto:christopher.guzman.monsalvo@gmail.com">christopher.guzman.monsalvo@gmail.com</a><br/><br/>
          Gracias.
        `);
        modal.open();
      });
  };

  return (
    <div className='EventRegistration'>
      <HorizontalSpace size='small' />
      <div className='row'>
        <div className='col s2 hide-on-small-only'></div>
        <EventGetBadgeForm
          formRef={badgeFormRef}
          isLoading={isLoading}
          event={props.event}
          getBadgeAPICall={getBadgeAPICall} />
        <div className='col s2 hide-on-small-only'></div>
      </div>
      <HorizontalSpace size='small' />
      <div className='row'>
        <div className='col s2 hide-on-small-only'></div>
        <EventRegistrationForm
          formRef={regFormRef}
          isLoading={isLoading}
          event={props.event}
          eventId={props.eventId}
          eventName={props.eventName}
          responsiveLetter={props.responsiveLetter}
          registerUserAPICall={registerUserAPICall} />
        <div className='col s2 hide-on-small-only'></div>
      </div>
      <Modal
        setModal={setModal}
        success={modalSuccess}
        title={modalTitle}
        message={modalMessage}
        onCloseEnd={onCloseEnd}
        fixedFooter={true} />
      <LoadingModal
        setLoadingModal={setLoadingModal}
        title={loadingModalTitle}
        message={loadingModalMessage} />
    </div>
  );
};

export default EventRegistration;
