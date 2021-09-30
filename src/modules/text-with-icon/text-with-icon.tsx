import React from 'react';
import 'src/modules/text-with-icon/text-with-icon.scss';

const TextWithIcon = (props: any): React.ReactElement => {
  return (
   <div className={`TextWithIcon ${props.size}`}>
      <a
      href={`${props.use} ${props.link}`}
      className={`TextWithIcon__item center-align ${props.color_item}`}
      target='_blank'
      rel='noreferrer'>
      <div className='TextWithIcon__flex'>
        <i className={`material-icons ${props.color_icon}`}>{props.icon}</i>
        <span className={`${props.text_color} ${props.truncate}`}>{props.text}</span>
      </div>
      </a>
   </div>
  );
};

export default TextWithIcon;
