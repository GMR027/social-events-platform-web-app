import React, {
  useState
} from 'react';
import SubTitle from 'src/modules/sub-title/sub-title';
import {
  CommonInput,
  InputImgFile
} from 'src/modules/forms/inputs';
import { ButtonDownload } from 'src/modules/forms/buttons';
import HorizontalSpace from 'src/modules/horizontal-space/horizontal-space';

const EventUpdateRegistrationForm = (props: any): React.ReactElement => {
  const [covidTestResultImage, setCovidTestResultImage] = useState('');
  const [signedResponsiveLetter, setSignedResponsiveLetter] = useState('');
  const [email, setEmail] = useState(null);

  return (
    <form className='col s12 m8' ref={props.formRef}>
      <SubTitle text='Subir prueba de COVID y/o carta responsiva despues del registro'/>
      <p className='EventRegistration__text-instrucctions grey-text text-darken-3'>
        Si usted ya esta registrado a este evento y requiere subir su prueba de COVID actualizada y/o su carta responsiva firmada, por favor utilize el siguiente formulario para subir sus documentos.
        <b>Nota importante: Solo formato de fotos e imagenes son admitidas, archivos PDF no son compatibles en este momento.</b>
      </p>
      <ButtonDownload
        color='red'
        file={props.responsiveLetter}
        text='Descargar Carta Responsiva' />
      <InputImgFile
        setImage={setCovidTestResultImage}
        name='Adjuntar prueba de COVID'
        color='blue' validate={true} disabled={props.isLoading} />
      <InputImgFile
        setImage={setSignedResponsiveLetter}
        name='Adjuntar carta responsiva'
        color='blue' validate={true} disabled={props.isLoading} />
      <HorizontalSpace size='xx-small' />
      <p className='EventRegistration__text-instrucctions grey-text text-darken-3'>
        Por favor ingrese el correo electronico con el que se registro al evento.
      </p>
      <CommonInput textInput='Correo eléctronico *' type='email' id='update-email' onChange={(e: any) => {
        setEmail(e.target.value);
      }} placeholder='Ingrese respuesta' validate={true} disabled={props.isLoading} />
      <CommonInput inputAlign='center' id='submit' type='submit' onClick={(e: any) => {
          e.preventDefault();
          const data: any = {
            data: {
              type: 'EventUserRegistration',
              id: null,
              attributes: {
                email: email
              }
            }
          };
          if ( signedResponsiveLetter ) {
            data.data.attributes.img_signed_responsive_letter = signedResponsiveLetter;
          }
          if ( covidTestResultImage ) {
            data.data.attributes.img_covid_test_result = covidTestResultImage;
          }
          props.updateRegistrationAPICall(data);
        }} value='Subir documentos' className='btn' disabled={props.isLoading} />
    </form>
  );
};

export default EventUpdateRegistrationForm;
