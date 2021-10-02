import React from 'react';
import 'src/modules/forms/components-forms/inputs.scss';

const Inputs = (props: any): React.ReactElement => {
  return (
    <div
      style={{textAlign: props.inputAlign}}
      className={props.className}>
      <div>{props.textInput}</div>
      <input className={`input-field ${props.inputClassname}`} type={props.type} placeholder={props.placeholder} value={props.value}/>
    </div>
  );
};

export default Inputs;
