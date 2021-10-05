import React from 'react';
import HorizontalSpace from 'src/modules/horizontal-space/horizontal-space';
import SubTitle from 'src/modules/sub-title/sub-title';
import 'src/modules/events/components/event-agenda.scss';
// import { ShortDateParser } from 'src/modules/utils/date-parser';

const EventAgenda = (props: any): React.ReactElement => {
  return (
    <div className='EventAgenda'>
      <HorizontalSpace size='small'/>
      <SubTitle text={`Agenda de evento ${props.event.attributes.title}`} />
      <div className='row'>
        <div className='col s1 hide-on-small-only'></div>
        <div className='col s12 m10'>
          Agenda here
        </div>
        <div className='col s1 hide-on-small-only'></div>
      </div>
    </div>
  );
};

export default EventAgenda;
