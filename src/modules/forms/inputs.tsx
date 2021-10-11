import React from 'react';

export const CommonInput = (props: any): React.ReactElement => {
  return (
    <div
      style={{textAlign: props.inputAlign}}
      className='input-field'>
      <input
        className={`${props.validate ? 'validate' : ''} ${props.className}`}
        disabled={props.disabled}
        type={props.type}
        id={props.id}
        value={props.value}
        maxLength={props.maxLength}
        onClick={props.onClick}
        ref={ props.reference ? props.reference : null }
        onChange={props.onChange} />
      <label htmlFor={props.id}>{props.textInput}</label>
    </div>
  );
};

export const InputImgFile = (props: any): React.ReactElement => {
  return (
    <div className='file-field input-field'>
      <div className={`btn ${props.color} ${props.className}`}>
        <span>{props.name}</span>
        <input type='file' accept="image/*"
          className={props.validate ? 'validate' : ''}
          src={props.src} name='img_covid_test_result'
          disabled={props.disabled}
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
          <input
            disabled={props.disabled}
            className='file-path validate'
            type='text' />
        </div>
      </div>
    </div>
  );
};
