import React from 'react';
import 'src/modules/forms/components-forms/inputs.scss';

export const CommonInput = (props: any): React.ReactElement => {
  return (
    <div
      style={{textAlign: props.inputAlign}}
      className='input-field'>
      <input
        className={props.inputClassname}
        type={props.type}
        id={props.id}
        onClick={props.onClick}
        onChange={props.onChange} />
      <label htmlFor={props.id}>{props.textInput}</label>
    </div>
  );
};

export const InputImgFile = (props: any): React.ReactElement => {
  return (
    <div className='file-field input-field'>
      <div className='btn'>
        <span>{props.name}</span>
        <input type='file' width='48' height='48'
          src={props.src} name='img_covid_test_result'
          onChange={(e: any) => {
            const reader = new FileReader();
            reader.onload = (e: any) => {
              props.setImage(e.target.result);
            };
            reader.readAsDataURL(e.target.files[0]);
          }} />
      </div>
      <div className='file-path-wrapper'>
        <div className='file-path-wrapper'>
          <input className='file-path validate' type='text' />
        </div>
      </div>
    </div>
  );
};

