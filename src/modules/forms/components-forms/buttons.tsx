import React from 'react';
import 'src/modules/forms/components-forms/inputs.scss';

export const ButtonLink = (props: any): React.ReactElement => {
  return (
    <a
      className={`btn Buttons ${props.colorbutton}`}
      href={props.link}>{props.text}
    </a>
  );
};


export const ButtonDownload = (props: any): React.ReactElement => {
  return (
    <a
      className={`btn Buttons ${props.colorbutton}`}
      href={props.file}
      target='_blank'
      rel='noreferrer'
      download>{props.text}
    </a>
  );
};

