import React from 'react';
import { Link } from 'react-router-dom';
import 'src/modules/events/components/presenter-button.scss';

const PresentButton = (props: any): React.ReactElement => {
  return (
    <Link
      to={props.link}>
      <div className={`PresentButton ${props.size}`}>
        <div
          style={{backgroundImage: `url(${props.image})`}}
          className='PresentButton__image'>
        </div>
        <div className='PresentButton__containerText'>
          <div className='PresentButton__presentText grey-text text-darken-4'>{props.text}</div>
          <div className={`PresentButton__accesText ${props.colorAcces}`}>{props.textAcces}</div>
        </div>
      </div>
    </Link>
  );
};

export default PresentButton;
