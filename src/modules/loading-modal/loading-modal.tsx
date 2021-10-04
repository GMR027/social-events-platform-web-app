import React, {
  useEffect,
  useRef
} from 'react';
import * as M from 'materialize-css';
import Title from 'src/modules/title/title';
import 'src/modules/loading-modal/loading-modal.scss';

const LoadingModal = ( props: any ): React.ReactElement => {
  const modalRef: any = useRef(null);

  useEffect(() => {
    const instance = M.Modal.init(modalRef.current, {
      opacity: 0.5
    });
    props.setLoadingModal(instance);
  }, [M]);

  return (
    <>
      <div className='modal LoadingModal' ref={modalRef}>
        <div className='modal-content'>
          <Title text={props.title} color='#00acc1'/>
          <div
            className='black-text'
            dangerouslySetInnerHTML={{__html: props.message}}></div>
        </div>
        <div className='progress'>
            <div className='indeterminate'></div>
        </div>
      </div>
    </>
  );
};

export default LoadingModal;
