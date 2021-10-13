import React, { useState } from 'react';
import { CommonInput } from 'src/modules/forms/inputs';
import SubTitle from 'src/modules/sub-title/sub-title';

const EventGetBadgeForm = (props: any): React.ReactElement => {
  const [email, setEmail] = useState(null);

  return (
    <form className='col s12 m8' ref={props.formRef}>
      <SubTitle text='¿Ya está usted registrado?'/>
      <p className='EventRegistration__text-instrucctions grey-text text-darken-3'>
        Si usted ya esta registrado a este evento y requiere acceder a su gafete virual,
        por favor ingrese su correo electronico y le enviaremos un correo con el enlace
        para que pueda acceder a su gafete en todo momento, gracias!
      </p>
      <CommonInput textInput='Correo eléctronico *' type='email' id='recovery-email' onChange={(e: any) => {
        setEmail(e.target.value);
      }} placeholder='Ingrese respuesta' validate={true} disabled={props.isLoading} />
      <CommonInput inputAlign='center' id='submit' type='submit' onClick={(e: any) => {
          e.preventDefault();
          const data = {
            data: {
              type: 'RetrieveBadge',
              attributes: {
                email: email,
                event: props.event.id
              }
            }
          };
          props.getBadgeAPICall(data);
        }} value='Obtener mi gafete' className='btn' disabled={props.isLoading} />
    </form>
  );
};

export default EventGetBadgeForm;
