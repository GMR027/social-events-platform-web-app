import React, {
  useEffect,
  useState,
  useRef
} from 'react';
import {
  useHistory,
  useParams
} from 'react-router-dom';
import 'src/modules/check-in/check-in.scss';
import fetchData from 'src/modules/utils/fetch-data';
import ParallaxHeaderImage from 'src/modules/parallax-header-image/parallax-header-image';
import { DateParser } from 'src/modules/utils/date-parser';
import HorizontalSpace from 'src/modules/horizontal-space/horizontal-space';
import { CommonInput } from 'src/modules/forms/inputs';
import Modal from 'src/modules/modal/modal';
import LoadingModal from 'src/modules/loading-modal/loading-modal';
import { APIPost } from 'src/api/communicator';

const eventDetailData = {
  id: '',
  attributes: {
    title: '',
    img_cover: '',
    img_logo: '',
    city: '',
    start_date: '',
    end_date: '',
    check_in_pin: ''
  }
};

const badgeData = {
  attributes: {
    img_user: '',
    first_name: '',
    last_name: '',
    identifier: '',
    check_in_complete: false
  },
  relationships: {
    event: {
      data: eventDetailData
    }
  }
};

const modelInterface = {
  open: () => null,
  close: () => null
};

const CheckIn = (props: any): React.ReactElement => {
  const [isLoading, setIsLoading] = useState(false);
  const checkInFormRef: any = useRef(null);
  const history = useHistory();
  const params: any = useParams();
  const [badge, setBadge] = useState(badgeData);
  const [event, setEvent] = useState(eventDetailData);
  const [pin, setPin] = useState(null);
  const [modal, setModal] = useState(modelInterface);
  const [loadingModal, setLoadingModal] = useState(modelInterface);
  const [modalSuccess, setModalSuccess] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModaMessage] = useState('');
  const [loadingModalTitle, setLoadingModalTitle] = useState('');
  const [loadingModalMessage, setLoadingModalMessage] = useState('');

  useEffect(() => {
    fetchData(`user-registrations/?filter[identifier]=${params.badgetId}&include=event`)
    .then((response: any) => {
      if (response.data.length === 0) {
        if (!badgeData) return history.replace('/');
      } else {
        const badgeData = response.data[0];
        if (!badgeData) return history.replace('/');
        const event = badgeData.relationships.event.data;
        setEvent(event);
        props.setLogo(event.attributes.img_logo);
        props.setLogoURL(`/${event.attributes.slug}`);
        setBadge(badgeData);
      }
    })
    .catch(() => {
      return history.replace('/');
    });
  }, [fetchData]);

  const onCloseEnd = () => {
    modal.close();
  };

  const checkInAPICall = (data: any) => {
    const attr = data.data.attributes;
    if ( !attr.identifier || !attr.pin ) {
      setModalSuccess(false);
      setModalTitle('Error');
      setModaMessage('Por favor ingrese el PIN del evento<br><br>Gracias.');
      return modal.open();
    }
    setLoadingModalTitle('Haciendo check in...');
    setLoadingModalMessage(`Un momento por favor estamos haciendo check in para el evento <b>${event.attributes.title}</b>.
      Por favor no actualize esta pantalla.
    `);
    loadingModal.open();
    setIsLoading(true);
    APIPost('user-check-in/', data)
      .then(() => {
        setIsLoading(false);
        loadingModal.close();
        checkInFormRef.current.reset();
        setModalSuccess(true);
        setModalTitle('Check in exitoso!');
        setModaMessage(`${badge.attributes.first_name}, usted ha realizado check in exitosamente al evento <b>${event.attributes.title}</b>.<br/><br/>Gracias.`);
        const newBadge = {...badgeData};
        newBadge.attributes.check_in_complete = true;
        setBadge(newBadge);
        modal.open();
      })
      .catch(() => {
        setIsLoading(false);
        loadingModal.close();
        setModalSuccess(false);
        setModalTitle('Error procesando su check in');
        setModaMessage(`${badge.attributes.first_name}, ha ocurrido un error al intentar registrar su check in
          para el evento <b>${event.attributes.title}</b>.
          <br/><br/>Si sigue teniendo inconvenientes con el registro a este evento, por favor contacte
          a nuestro equipo de soporte tecnico en el siguiente correo electronico:
          <a href="mailto:christopher.guzman.monsalvo@gmail.com">christopher.guzman.monsalvo@gmail.com</a><br/><br/>
          Gracias.
        `);
        modal.open();
      });
  };

  return (
    <>
      <ParallaxHeaderImage size='x-small' image={event.attributes.img_cover} title={event.attributes.title}
        location={`${event.attributes.city} - del ${
          event.attributes.start_date ? DateParser(event.attributes.start_date) : null
        } al ${ event.attributes.end_date ? DateParser(event.attributes.end_date) : null }`} />
      <div className='container row'>
        <HorizontalSpace size='medium'/>
        <div className='col s3 hide-on-small-only'></div>
        <div className='col s12 m6'>
          <div
            className='CheckIn__image-profile z-depth-1'
            style={{backgroundImage: `url(${badge.attributes.img_user})`}}></div>
          <HorizontalSpace size='x-small'/>
          <div className='CheckIn__name'>Hola {badge.attributes.first_name} {badge.attributes.last_name}!</div>
          {
            badge.attributes.check_in_complete ?
              <div>
                <span>Check in completado, puede disfrutar del evento ahora.</span>
                <HorizontalSpace size='large'/>
              </div> :
              <div>
                <HorizontalSpace size='xx-small'/>
                <p className='EventRegistration__text-instrucctions grey-text text-darken-3'>
                  Para realizar el check in al evento, por favor ingrese el PIN del evento, gracias!
                </p>
                <form ref={checkInFormRef}>
                  <CommonInput textInput='Pin del evento *' type='tel' id='pin' onChange={(e: any) => {
                    setPin(e.target.value);
                  }} placeholder='Ingrese respuesta' validate={true} maxLength='4' disabled={isLoading} />
                  <CommonInput inputAlign='center' id='submit' type='submit' onClick={(e: any) => {
                    e.preventDefault();
                    const data = { data: {
                        type: 'UserCheckIn',
                        attributes: {
                          identifier: badge.attributes.identifier,
                          pin: pin
                        }
                      }
                    };
                    checkInAPICall(data);
                  }} value='Check in' className='btn' disabled={isLoading} />
                </form>
              </div>
          }
        </div>
        <div className='col s3 hide-on-small-only'></div>
        <HorizontalSpace size='x-small'/>
      </div>
      <Modal setModal={setModal} success={modalSuccess} title={modalTitle} message={modalMessage} onCloseEnd={onCloseEnd} fixedFooter={true} />
      <LoadingModal setLoadingModal={setLoadingModal} title={loadingModalTitle} message={loadingModalMessage} />
    </>
  );
};

export default CheckIn;
