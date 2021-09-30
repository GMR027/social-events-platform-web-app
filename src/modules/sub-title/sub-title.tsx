import React from 'react';
import 'src/modules/sub-title/sub-title.scss';

const SubTitle = (props: any): React.ReactElement => {
  return (
    <div className={`SubTitle ${ props.fullWidth ? '' : 'row'}`}>
      {
        props.fullWidth ? null : <em className='col m2 l1 hide-on-small-only Title__space'></em>
      }
      <div className={`${ props.fullWidth ? '' : 'col s12 m8 l10'} SubTitle__text`}
        style={{
          color: props.color,
          textAlign: props.align ? props.align : 'center',
          textShadow: props.shadow ? '0px 0px 2px rgba(0, 0, 0, 0.6)' : ''
        }}>
        {props.text}
      </div>
      {
        props.fullWidth ? null : <em className='col m2 l1 hide-on-small-only Title__space'></em>
      }
    </div>
  );
};

export default SubTitle;
