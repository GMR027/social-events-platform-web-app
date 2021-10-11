import React from 'react';
import 'src/modules/events/components/expositor.scss';

const Expositor = (props: any): React.ReactElement => {
  return (
    <a href={props.link} target='_blank' rel='noreferrer'>
      <div className={`Expositor ${props.size}`}>
        <div
          style={{backgroundImage: `url(${props.image})`}}
          className='Expositor__image'>
        </div>
        <div className='Expositor__containerText'>
          <div className='Expositor__presentText grey-text text-darken-4'>{props.text}</div>
          <div className={`Expositor__accesText ${props.colorAccess}`}>Ver mas</div>
        </div>
      </div>
    </a>
  );
};

export default Expositor;
