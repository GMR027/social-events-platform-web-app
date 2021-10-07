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
  const link = `/media${props.file.split('/media')[1]}`;
  return (
    <a
      className={`btn ${props.color}`}
      href={link}
      download>{props.text}</a>
  );
};
