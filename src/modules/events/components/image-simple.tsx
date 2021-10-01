import React from 'react';
import 'src/modules/events/components/image-simple.scss';

const ImageSimple = (props: any): React.ReactElement => {
  return (
    <div className='ImageSimple'>
      <div
        className='ImageSimple__image'
        style={{backgroundImage: `url(${props.imageSimple})`}}>
      </div>
    </div>
  );
};

export default ImageSimple;
