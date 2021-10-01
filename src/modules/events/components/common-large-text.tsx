import React from 'react';
import Title from 'src/modules/title/title';

const CommonLargeText = (props: any): React.ReactElement => {
  return (
    <>
      {
        props.title ? <Title text={props.title} /> : null
      }
      <div
        className='Stand__common-large-text'
        dangerouslySetInnerHTML={{__html: props.text}}>
      </div>
    </>
  );
};

export default CommonLargeText;
