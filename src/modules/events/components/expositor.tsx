import React from 'react';
import { Link } from 'react-router-dom';
import 'src/modules/events/components/expositor.scss';

const Expositor = (props: any): React.ReactElement => {
  return (
    <Link
      to={props.link || '#'}>
      <div className={`Expositor ${props.size}`}>
        <div
          style={{backgroundImage: `url(${props.image})`}}
          className='Expositor__image'>
        </div>
        <div className='Expositor__containerText'>
          <div className='Expositor__presentText grey-text text-darken-4'>{props.text}</div>
          <div className={`Expositor__accesText ${props.colorAccess}`}>{props.textAccess}</div>
        </div>
      </div>
    </Link>
  );
};

export default Expositor;
