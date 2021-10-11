import React from 'react';
import SubTitle from 'src/modules/sub-title/sub-title';
import HorizontalSpace from 'src/modules/horizontal-space/horizontal-space';
import 'src/modules/general-information-tab/general-information-tab.scss';

const GeneralInformationComponent = (props: any): React.ReactElement => {
  return (
    <>
      <HorizontalSpace size='small'/>
      <SubTitle text={props.title} />
      <img src={props.img} width='100%' />
      <div dangerouslySetInnerHTML={{__html: props.content}}></div>
    </>
  );
};

export default GeneralInformationComponent;
