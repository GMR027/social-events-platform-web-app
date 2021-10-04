import React from 'react';

export const ButtonLink = (props: any): React.ReactElement => {
  return (
    <a
      className={`btn ${props.color}`}
      href={props.link}>{props.text}
    </a>
  );
};


export const ButtonDownload = (props: any): React.ReactElement => {
  return (
    <a
      className={`btn ${props.color}`}
      href={props.file}
      target='_blank'
      rel='noreferrer'
      download>{props.text}
    </a>
  );
};
