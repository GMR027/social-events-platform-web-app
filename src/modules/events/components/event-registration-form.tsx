import React, { useState } from 'react';
import {
  CommonInput,
  InputImgFile
} from 'src/modules/forms/inputs';
import { ButtonDownload } from 'src/modules/forms/buttons';
import HorizontalSpace from 'src/modules/horizontal-space/horizontal-space';
import SubTitle from 'src/modules/sub-title/sub-title';

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

  return (
    <form className='col s12 m8' ref={props.formRef}>
      <SubTitle text='Nuevo registro al evento'/>
      <p className='EventRegistration__text-instrucctions grey-text text-darken-3'>
        Por favor complete el siguiente formulario para registrarse al evento de {props.eventName}.
        Todos los campos marcados con un * al final son obligatorios.
      </p>
      <CommonInput textInput='Nombre(s) *' type='text' id='first_name' onChange={(e: any) => {
        setFirstName(e.target.value);
      }} placeholder='Ingrese respuesta' validate={true} disabled={props.isLoading} />
      <CommonInput textInput='Apellidos *' type='text' id='last_name' onChange={(e: any) => {
        setLastName(e.target.value);
      }} placeholder='Ingrese respuesta' validate={true} disabled={props.isLoading} />
      <CommonInput textInput='Ciudad *' type='text' id='city' onChange={(e: any) => {
        setCity(e.target.value);
      }} placeholder='Ingrese respuesta' validate={true} disabled={props.isLoading} />
      <CommonInput textInput='Zona' type='text' id='zone' onChange={(e: any) => {
        setZone(e.target.value);
      }} placeholder='Ingrese respuesta' validate={true} disabled={props.isLoading} />
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
        Opcionalmente puede agregar una foto para su gafete del evento de {props.eventName}.
      </p>
      <InputImgFile
        src={imgUser}
        setImage={setImgUser}
        name='Foto para el gafete'
        color='blue'
        disabled={props.isLoading} />
      <HorizontalSpace size='xx-small' />
      <p className='EventRegistration__text-instrucctions grey-text text-darken-3'>
        Para continuar con el registro al evento, por favor adjunte
        su prueba de COVID y la carta responsiva firmada.
      </p>
      <ButtonDownload
        color='red'
        file={props.responsiveLetter}
        text='Descargar Carta Responsiva' />
      <InputImgFile
        src={covidTestResultImage}
        setImage={setCovidTestResultImage}
        name='Prueba de COVID *'
        color='blue' validate={true} disabled={props.isLoading} />
      <InputImgFile
        src={signedResponsiveLetter}
        setImage={setSignedResponsiveLetter}
        name='Carta responsiva *'
        color='blue' validate={true} disabled={props.isLoading} />
      <HorizontalSpace size='xx-small' />
      <CommonInput inputAlign='center' id='submit' type='submit' onClick={(e: any) => {
          e.preventDefault();
          const data = {
            data: {
              type: 'EventUserRegistration',
              attributes: {
                first_name: firstName, last_name: lastName,
                city: city, zone: zone, email: email,
                phone: phone, emergency_phone: emergencyPhone,
                img_covid_test_result: covidTestResultImage,
                img_signed_responsive_letter: signedResponsiveLetter,
                img_user: imgUser
              },
              relationships: {event: {data: {type: 'Event', id: props.eventId}}}
            }
          };
          props.registerUserAPICall(data);
        }} value='Registrarme al evento' className='btn' disabled={props.isLoading} />
    </form>
  );
};

export default EventRegistrationForm;
