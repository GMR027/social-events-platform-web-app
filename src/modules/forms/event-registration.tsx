import React from 'react';
import HorizontalSpace from 'src/modules/horizontal-space/horizontal-space';
import Inputs from 'src/modules/forms/components-forms/inputs';
import {
  ButtonDownload,
  ButtonUpLoad
} from 'src/modules/forms/components-forms/buttons';

const EventRegistration = (props: any): React.ReactElement => {
  return (
    <div className='EventRegistration'>
      <HorizontalSpace size='small' />
      <div className='container'>
        <div className='col s1 hide-on-small-only'></div>
        <div className='col s12 m10'>
          <Inputs
          textInput='Nombre(s)'
          placeholder='Ingrese respuesta'
          type='text'
          inputClassname='grey-text text-darken-2' />
          <Inputs
          textInput='Apellidos'
          placeholder='Ingrese respuesta'
          type='text'
          inputClassname='grey-text text-darken-2' />
          <Inputs
          textInput='Ciudad'
          placeholder='Ingrese respuesta'
          type='text'
          inputClassname='grey-text text-darken-2' />
          <Inputs
          textInput='Zona'
          placeholder='Ingrese respuesta'
          type='text'
          inputClassname='grey-text text-darken-2' />
          <Inputs
          textInput='Correo eléctronico'
          placeholder='Ingrese respuesta'
          type='email'
          inputClassname='grey-text text-darken-2' />
          <Inputs
          textInput='Teléfono'
          placeholder='Ingrese respuesta'
          type='tel'
          inputClassname='grey-text text-darken-2' />
          <Inputs
          textInput='Teléfono de contacto o emergencia'
          placeholder='Ingrese respuesta'
          type='tel'
          inputClassname='grey-text text-darken-2' />
          <div className='EventRegistration__buttons'>
            <span className='EventRegistration__buttoncontainer'>
            <ButtonDownload
              colorbutton='red'
              file={props.file}
              text='Descargar Carta Responsiva' />
            </span>
            <span className='EventRegistration__buttoncontainer'>
            <ButtonUpLoad
              colorbutton='red'
              text='SUBIR CARTA RESPONSIVA' />
            </span>
          </div>
          <Inputs
          inputAlign='center'
          inputClassname='btn grey darken-2'
          value='Enviar Registro'
          type='submit' />
        </div>
      </div>
          <div className='col s1 hide-on-small-only'></div>
    </div>
  );
};

export default EventRegistration;
