import React, {
  useState
} from 'react';
import EnvironmentVariables from 'src/constants/EnvironmentVariables';
import FacebookLogin from 'react-facebook-login'; // https://www.npmjs.com/package/react-facebook-login
import RegisterUserAPICall from 'src/modules/register-user/register-user-api-calls';
import { APIGet } from 'src/api/communicator';
import SubTitle from 'src/modules/sub-title/sub-title';
import Modal from 'src/modules/modal/modal';
import { ArrayErrorsToHTMLList } from 'src/modules/utils/date-parser';
import { SetUserData } from 'src/redux/actions/user-actions';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

const env = EnvironmentVariables.getInstance();
const facebookAppID = env.facebookAppID;
const modelInterface = {
  open: () => null,
  close: () => null
};
const newUserPayload = {
  data: {
    type: 'User',
    attributes: {
      first_name: '',
      last_name: '',
      email: '',
      username: '',
      password: '',
      img_picture: ''
    }
  }
};

const FacebookRegistration = ( porps: any ): React.ReactElement => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [modal, setModal] = useState(modelInterface);
  const [modalSuccess, setModalSuccess] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModaMessage] = useState('');

  const onCloseEnd = () => {
    modal.close();
    if ( modalSuccess ) return history.replace('/');
  };

  const FacebookCB = (response: any) => {
    porps.setIsLoading(true);
    const accessToken = response.accessToken;
    const userID = response.userID;
    if ( !userID || !accessToken || !response.email ) return porps.setIsLoading(false);
    const name = response.name ? response.name.split(' ') : [];
    newUserPayload.data.attributes.first_name = name.length && name[0] ? name[0] : '';
    newUserPayload.data.attributes.last_name = name.length && name[1] ? name[1] : '';
    newUserPayload.data.attributes.email = response.email;
    newUserPayload.data.attributes.username = `SN-${response.email}`;
    newUserPayload.data.attributes.password = userID;
    const url = `https://graph.facebook.com/v11.0/${userID}/picture?type=large&redirect=false&access_token=${accessToken}`;
    APIGet( url, false )
      .then((picture: any) => {
        const img: any = new Image();
        img.crossOrigin = 'anonymous';
        img.src = picture.data.url;
        setTimeout(() => {
          const canvas = window.document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx: any = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0);
          const facebookImage = canvas.toDataURL('image/png');
          newUserPayload.data.attributes.img_picture = facebookImage;
          RegisterUserAPICall(newUserPayload, true)
          .then((response: any) => {
            dispatch(SetUserData(response));
            porps.setIsLoading(false);
            setModalSuccess(true);
            setModalTitle('Cuenta creada');
            setModaMessage(`<b>${newUserPayload.data.attributes.first_name}</b>, su cuenta de Nedii ha sido creada exitosamente.<br/><br/>
              Usted sera loggeado automaticamente.`);
            modal.open();
          })
          .catch((error: any) => {
            porps.setIsLoading(false);
            setModalSuccess(false);
            setModalTitle('Error');
            if ( !error.response ) {
              setModaMessage(`<b>${newUserPayload.data.attributes.first_name}</b>, ha sucedido un error creando su cuenta de Nedii.<br/><br/>Errores:<ol><li>Error enviando informacion al servidor</li></ol>
              Por favor contacte al equipo tecnico de Nedii mencionando el codigo: <b>"Error de conexion con el servidor"</b>.`);
              return modal.open();
            }
            const errorMessages = ArrayErrorsToHTMLList(error.response.data.errors);
            setModaMessage(`<b>${newUserPayload.data.attributes.first_name}</b>, ha sucedido un error creando su cuenta de Nedii.<br/><br/>Errores:<ol>${errorMessages}</ol>
              Si esta seguro de que los datos son correctos, por favor contacte al equipo tecnico de Nedii mencionando el codigo: <b>"${error.response.statusText} - ${error.response.status}"</b>.`);
            modal.open();
          });
        }, 1700);
      })
      .catch((error) => {
        console.log(error);
        porps.setIsLoading(false);
      });
  };

  return (
    <>
      <div className='col s12'><SubTitle text='Registro con redes sociales' /></div>
      <Modal setModal={setModal} success={modalSuccess} title={modalTitle} message={modalMessage} onCloseEnd={onCloseEnd} fixedFooter={true} />
      <div className='RegisterUser__social-login col s12 row'>
        <FacebookLogin appId={facebookAppID} autoLoad={false} callback={FacebookCB}
          fields='name,email,picture' scope='public_profile,email'
          icon='fa-facebook' textButton='Registro' />
      </div>
    </>
  );
};

export default FacebookRegistration;
