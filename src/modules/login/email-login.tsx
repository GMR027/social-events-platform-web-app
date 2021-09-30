import React, {
  FormEvent,
  useRef,
  useState
} from 'react';
import LoginUserAPICall from 'src/modules/login/login-user-api-calls';
import EmailLoginFrom from 'src/modules/login/email-login-from';
import SubTitle from 'src/modules/sub-title/sub-title';
import Modal from 'src/modules/modal/modal';
import { ArrayErrorsToHTMLList } from 'src/modules/utils/date-parser';
import { SetUserData } from 'src/redux/actions/user-actions';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

const modelInterface = {
  open: () => null,
  close: () => null
};

const loginPayload = {
  data: {
    type: 'login',
    email: '',
    password: ''
  }
};

const EmailLogin = ( porps: any ): React.ReactElement => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const formRef: any = useRef(null);
  const [modal, setModal] = useState(modelInterface);
  const [modalSuccess, setModalSuccess] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModaMessage] = useState('');

  const onCloseEnd = () => {
    modal.close();
  };

  const loginUser = (e: FormEvent) => {
    e.preventDefault();
    porps.setIsLoading(true);
    loginPayload.data.email = email;
    loginPayload.data.password = password;
    LoginUserAPICall(loginPayload)
      .then((response) => {
        formRef.current.reset();
        porps.setIsLoading(false);
        setEmail('');
        setPassword('');
        dispatch(SetUserData(response));
        return history.replace('/');
      })
      .catch((error: any) => {
        porps.setIsLoading(false);
        setModalSuccess(false);
        setModalTitle('Error');
        if ( !error.response ) {
          setModaMessage(`Ha sucedido un error intentando acceder a su cuenta de Nedii.<br/><br/>Errores:<ol><li>Error enviando informacion al servidor</li></ol>
          Por favor contacte al equipo tecnico de Nedii mencionando el codigo: <b>"Error de conexion con el servidor"</b>.`);
          return modal.open();
        }
        const errorMessages = ArrayErrorsToHTMLList(error.response.data.errors);
        setModaMessage(`Ha sucedido un error intentando acceder a su cuenta de Nedii.<br/><br/>Errores:<ol>${errorMessages}</ol>
          Si esta seguro de que los datos son correctos, por favor contacte al equipo tecnico de Nedii mencionando el codigo: <b>"${error.response.statusText} - ${error.response.status}"</b>.`);
        modal.open();
      });
  };

  return (
    <>
      <div className='col s12'><SubTitle text='Login con correo' /></div>
      <Modal setModal={setModal} success={modalSuccess} title={modalTitle} message={modalMessage} onCloseEnd={onCloseEnd} fixedFooter={true} />
      <EmailLoginFrom formRef={formRef}
        email={email} setEmail={setEmail}
        password={password} setPassword={setPassword}
        loginUser={loginUser} isLoading={porps.isLoading} />
    </>
  );
};

export default EmailLogin;
