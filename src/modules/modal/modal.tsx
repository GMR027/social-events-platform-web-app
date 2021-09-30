import React, {
  useEffect,
  useRef
} from 'react';
import * as M from 'materialize-css';
import Title from 'src/modules/title/title';
import 'src/modules/modal/modal.scss';

const Modal = ( props: any ): React.ReactElement => {
  const modalRef: any = useRef(null);

  useEffect(() => {
    const instance = M.Modal.init(modalRef.current, {
      opacity: 0.5
    });
    props.setModal(instance);
  }, [M]);

  return (
    <>
      <div className={`modal ${props.fixedFooter ? 'modal-fixed-footer' : ''} Modal`} ref={modalRef}>
        <div className='modal-content'>
          <Title text={props.title} color={ props.success ? '#00acc1' : '#e53935' }/>
          <div
            className='black-text'
            dangerouslySetInnerHTML={{__html: props.message}}></div>
        </div>
        <div className='modal-footer'>
          <a onClick={props.onCloseEnd} className='modal-close waves-effect waves cyan white-text btn'>Aceptar</a>
        </div>
      </div>
    </>
  );
};

export default Modal;
