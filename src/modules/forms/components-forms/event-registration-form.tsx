import React, { useState } from 'react';
import {
  CommonInput,
  InputImgFile
} from 'src/modules/forms/components-forms/inputs';
import { ButtonDownload } from 'src/modules/forms/components-forms/buttons';

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

  return (
    <form className='col s12 m10'>
      <CommonInput textInput='Nombre(s)' type='text' id='first_name' onChange={(e: any) => {
        setFirstName(e.target.value);
      }} placeholder='Ingrese respuesta' />
      <CommonInput textInput='Apellidos' type='text' id='last_name' onChange={(e: any) => {
        setLastName(e.target.value);
      }} placeholder='Ingrese respuesta' />
      <CommonInput textInput='Ciudad' type='text' id='city' onChange={(e: any) => {
        setCity(e.target.value);
      }} placeholder='Ingrese respuesta' />
      <CommonInput textInput='Zona' type='text' id='zone' onChange={(e: any) => {
        setZone(e.target.value);
      }} placeholder='Ingrese respuesta' />
      <CommonInput textInput='Correo eléctronico' type='email' id='email' onChange={(e: any) => {
        setEmail(e.target.value);
      }} placeholder='Ingrese respuesta' />
      <CommonInput textInput='Teléfono' type='tel' id='phone' onChange={(e: any) => {
        setPhone(e.target.value);
      }} placeholder='Ingrese respuesta' />
      <CommonInput textInput='Teléfono de contacto o emergencia' type='tel' id='emergency_phone' onChange={(e: any) => {
        setEmergencyPhone(e.target.value);
      }} placeholder='Ingrese respuesta' />
      <div className='EventRegistration__buttons'>
        <p>
          Por favor agregue los datos necesarios
        </p>
        <span className='EventRegistration__buttoncontainer'>
          <ButtonDownload
            colorbutton='red'
            file={props.responsiveLetter}
            text='Descargar Carta Responsiva' />
        </span>
      </div>
      <InputImgFile
        src={covidTestResultImage}
        setImage={setCovidTestResultImage}
        name='Prueba de COVID' />
      <InputImgFile
        src={signedResponsiveLetter}
        setImage={setSignedResponsiveLetter}
        name='Carta responsiva' />
      <CommonInput inputAlign='center' id='submit' onClick={(e: any) => {
          e.preventDefault();
          const data = {
            data: {
              type: 'EventUserRegistration',
              attributes: {
                first_name: firstName, last_name: lastName,
                city: city, zone: zone, email: email,
                phone: phone, emergency_phone: emergencyPhone,
                img_covid_test_result: covidTestResultImage,
                img_signed_responsive_letter: signedResponsiveLetter
              },
              relationships: {event: {data: {type: 'Event', id: props.eventId}}}
            }
          };
          props.registerUserAPICall(data);
        }} value='Enviar Registro' type='submit' />
    </form>
  );
};

export default EventRegistrationForm;
