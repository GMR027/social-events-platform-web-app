import React, {
  useRef
} from 'react';
import HorizontalSpace from 'src/modules/horizontal-space/horizontal-space';

const EmailLoginFrom = ( props: any ): React.ReactElement => {
  const emailRef: any = useRef(null);
  const passwordRef: any = useRef(null);

  const validForm = (): boolean => {
    if ( !props.email || !props.password ) {
      return false;
    }
    return true;
  };
  return (
    <form onSubmit={props.loginUser} ref={props.formRef}>
      <div className='input-field col s12'>
        <input id='email' type='email' className='validate'
          onChange={( e: any ) => props.setEmail(e.target.value)}
          ref={emailRef} disabled={props.isLoading} />
        <label htmlFor='email'>Correo electronico</label>
      </div>
      <div className='input-field col s12'>
        <input id='password' type='password' className='validate'
          onChange={( e: any ) => props.setPassword(e.target.value)}
          ref={passwordRef} disabled={props.isLoading} />
        <label htmlFor='password'>Contrasena</label>
      </div>
      <div className='col s12'><HorizontalSpace size='small' /></div>
      <div className='col s12'>
        <div
          onClick={props.loginUser}
          className={`waves-effect waves-light btn cyan darken-1 right white-text ${!validForm() || props.isLoading ? 'disabled' : ''}`}>
          Login
        </div>
      </div>
      <div className={`col s12 ${ props.isLoading ? '' : 'hide' }`}><HorizontalSpace size='small' /></div>
      <div className={`progress col s12 ${ props.isLoading ? '' : 'hide' }`}>
        <div className='indeterminate'></div>
      </div>
    </form>
  );
};

export default EmailLoginFrom;
