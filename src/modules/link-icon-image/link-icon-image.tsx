import React from 'react';
import 'src/modules/link-icon-image/link-icon-image.scss';

const LinkIconImage = (props: any): React.ReactElement => {
  return (
    <>
      {
        props.link ?
        <a
          href={props.link}
          target='_blank'
          rel='noreferrer'>
        <div
          className='LinkIconImage'
          style={{
          backgroundImage: `url(${props.linkImage})`,
          borderRadius: props.borderRadiusMapImage,
          backgroundSize: props.justifyimage,
          height: props.size,
          width: props.size}}>
        </div>
        </a> : null
      }
    </>
  );
};

export default LinkIconImage;
