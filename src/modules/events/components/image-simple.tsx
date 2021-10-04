import React from 'react';

const ImageSimple = (props: any): React.ReactElement => {
  return (
    <a
      href={props.imageSimple}
      target='_blank'
      rel='noreferrer'
      className='ImageSimple'>
      <img src={props.imageSimple} alt='Mapa' width='100%'/>
    </a>
  );
};

export default ImageSimple;
