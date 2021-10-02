import React from 'react';

const CardIndicator = (props: any): React.ReactElement => {
  return (
    <div>
      <div className={`CardIndicator white-text ${props.colorIndicator}`}>
        <div className='CardIndicator__indicator'>
          <span className='CardIndicator__icon'>
            <i className='material-icons'>{props.icon}</i>
          </span>
          <span className='CardIndicator__text'>{props.text}</span>
        </div>
      </div>
    </div>
  );
};

export default CardIndicator;
