import React, {
  useState,
  useEffect,
  useRef
} from 'react';
import {
  CommonInput,
  InputImgFile
} from 'src/modules/forms/inputs';
import { ButtonDownload } from 'src/modules/forms/buttons';
import HorizontalSpace from 'src/modules/horizontal-space/horizontal-space';
import SubTitle from 'src/modules/sub-title/sub-title';
import { APIGet } from 'src/api/communicator';
import * as M from 'materialize-css';
import innerSort from 'src/modules/utils/inner-sort';

const EventRegistrationForm = (props: any): React.ReactElement => {
  const [covidTestResultImage, setCovidTestResultImage] = useState('');
  const [signedResponsiveLetter, setSignedResponsiveLetter] = useState('');
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [city, setCity] = useState(null);
  const [zone, setZone] = useState(null);
  const [email, setEmail] = useState(null);
  const [phone, setPhone] = useState(null);
  const [emergencyPhone, setEmergencyPhone] = useState(null);
  const [imgUser, setImgUser] = useState('');
  const citiesRef: any = useRef(null);
  const zonesRef: any = useRef(null);
  const eventName = props.event.attributes.title;
  M.FormSelect.init(zonesRef.current, {});

  useEffect(() => {
    APIGet('/assets/cities.json', false)
      .then((response: any) => {
        const data: any = {};
        for (let i = 0; i < response.length; i++) {
          data[response[i].city] = response[i].city;
        }
        M.Autocomplete.init(citiesRef.current, { data: data });
      })
      .catch((error) => {
        console.log('Hubo un error cities', error);
      });
  }, [APIGet, M]);

  return (
    <form className='col s12 m8' ref={props.formRef}>
      <SubTitle text='Nuevo registro al evento'/>
      <p className='EventRegistration__text-instrucctions grey-text text-darken-3'>
        Por favor complete el siguiente formulario para registrarse a la {eventName}.
        Todos los campos marcados con un * al final son obligatorios.
      </p>
      <CommonInput textInput='Nombre(s) *' type='text' id='first_name' onChange={(e: any) => {
        setFirstName(e.target.value);
      }} placeholder='Ingrese respuesta' validate={true} disabled={props.isLoading} />
      <CommonInput textInput='Apellidos *' type='text' id='last_name' onChange={(e: any) => {
        setLastName(e.target.value);
      }} placeholder='Ingrese respuesta' validate={true} disabled={props.isLoading} />
      <CommonInput textInput='Ciudad *' type='text' id='city' reference={citiesRef} onChange={(e: any) => {
        setCity(e.target.value);
      }} placeholder='Ingrese respuesta' validate={true} disabled={props.isLoading} />
      <div className='input-field' onClick={() => {
          props.event.relationships.zones.data = props.event.relationships.zones.data.sort(innerSort('zone'));
        }}>
        <select ref={zonesRef} onChange={(e: any) => {
          props.event.relationships.zones.data = props.event.relationships.zones.data.sort(innerSort('zone'));
          setZone(e.target.value);
        }}>
          <option value='' disabled selected>Seleccione su plaza</option>
          {
            props.event.relationships.zones.data.map((i: any, index: number) => {
              return (
                <option
                  key={index}
                  value={i.attributes.zone}>{i.attributes.zone}</option>
              );
            })
          }
        </select>
        <label>Plaza</label>
      </div>
      <CommonInput textInput='Correo eléctronico *' type='email' id='email' onChange={(e: any) => {
        setEmail(e.target.value);
      }} placeholder='Ingrese respuesta' validate={true} disabled={props.isLoading} />
      <CommonInput textInput='Teléfono *' type='tel' id='phone' onChange={(e: any) => {
        setPhone(e.target.value);
      }} placeholder='Ingrese respuesta' maxLength='10' validate={true} disabled={props.isLoading} />
      <CommonInput textInput='Teléfono de contacto o emergencia' type='tel' id='emergency_phone' onChange={(e: any) => {
        setEmergencyPhone(e.target.value);
      }} placeholder='Ingrese respuesta' maxLength='10' disabled={props.isLoading} />
      <HorizontalSpace size='xx-small' />
      <p className='EventRegistration__text-instrucctions grey-text text-darken-3'>
        Opcionalmente puede agregar una foto para su gafete de la {eventName}.
      </p>
      <InputImgFile
        src={imgUser}
        setImage={setImgUser}
        name='Foto para el gafete'
        color='blue'
        disabled={props.isLoading} />
      <HorizontalSpace size='xx-small' />
      <p className='EventRegistration__text-instrucctions grey-text text-darken-3'>
        Si usted tiene su prueba de COVID y/o carta responsiva firmada,
        por favor adjunte una foto de esos documentos. <b>(Solo formato de fotos e imagenes son admitidas) </b>
        Si necesita una copia de la carta responsiva, por favor de clic
        en el boton de abajo, gracias.
      </p>
      <ButtonDownload
        color='red'
        file={props.responsiveLetter}
        text='Descargar Carta Responsiva' />
      <InputImgFile
        src={covidTestResultImage}
        setImage={setCovidTestResultImage}
        name='Adjuntar prueba de COVID'
        color='blue' validate={true} disabled={props.isLoading} />
      <InputImgFile
        src={signedResponsiveLetter}
        setImage={setSignedResponsiveLetter}
        name='Adjuntar carta responsiva'
        color='blue' validate={true} disabled={props.isLoading} />
      <HorizontalSpace size='xx-small' />
      <CommonInput inputAlign='center' id='submit' type='submit' onClick={(e: any) => {
          e.preventDefault();
          const data: any = {
            data: {
              type: 'EventUserRegistration',
              attributes: {
                first_name: firstName, last_name: lastName,
                city: city, zone: zone, email: email,
                phone: phone, emergency_phone: emergencyPhone
              },
              relationships: {event: {data: {type: 'Event', id: props.event.id}}}
            }
          };
          if ( covidTestResultImage ) {
            data.data.attributes.img_covid_test_result = covidTestResultImage;
          }
          if ( signedResponsiveLetter ) {
            data.data.attributes.img_signed_responsive_letter = signedResponsiveLetter;
          }
          if ( imgUser ) {
            data.data.attributes.img_user = imgUser;
          }
          props.registerUserAPICall(data);
        }} value='Registrarme al evento' className='btn' disabled={props.isLoading} />
    </form>
  );
};

export default EventRegistrationForm;
