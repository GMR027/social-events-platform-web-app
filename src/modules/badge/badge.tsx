import React from 'react';
import 'src/modules/badge/badge.scss';
import QRCodeComponent from 'src/modules/events/components/code-qr';

const Badge = (props: any): React.ReactElement => {
  return (
    <div className='Badge'>
      <div
        className={`Badge__image ${props.className}`}
        style={{backgroundImage: `url(${props.image})`}}>
          <div
            className='Badge__imageProfile'
            style={{backgroundImage: `url(${props.imageProfile})`}}></div>
          <div className='Badge__name'>{props.name}</div>
          <div className='Badge__qr'>
            <QRCodeComponent/>
          </div>
      </div>
    </div>
  );
};

export default Badge;
