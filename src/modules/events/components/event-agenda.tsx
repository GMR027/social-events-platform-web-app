import React, {
  useRef,
  useEffect
} from 'react';
import HorizontalSpace from 'src/modules/horizontal-space/horizontal-space';
import SubTitle from 'src/modules/sub-title/sub-title';
import 'src/modules/events/components/event-agenda.scss';
import * as M from 'materialize-css';
import {
  DateParser
} from 'src/modules/utils/date-parser';

const TaskItem = ( props: any ): React.ReactElement => {
  const tableRef: any = useRef(null);

  useEffect(() => {
    M.Collapsible.init(tableRef.current, {});
  }, [M]);

  return (
    <ul className='collapsible' ref={tableRef}>
    {
      props.agenda.map((i: any, index: number) => {
        return (
          <li key={index}>
            <div className='collapsible-header ChangeLog__header'>
              <i className={`material-icons ChangeLog__icon--${i.attributes.type}`}>
                filter_drama
              </i>
              <div className='ChangeLog__task-name'>
                <span>{i.attributes.title}</span>
              </div>
              <span className='ChangeLog__user-name hide-on-small-only'>
                {DateParser(i.attributes.date)} - {i.attributes.starting_time} a {i.attributes.ending_time}
              </span>
            </div>
            <div
              className='collapsible-body ChangeLog__description'>
                <div>
                  <b>Conductor(a):</b> {i.relationships.expositor.data.attributes.title}
                </div>
                <div dangerouslySetInnerHTML={{
                  __html: i.attributes.description
                }}></div>
              </div>
          </li>
        );
      })
    }
    </ul>
  );
};

const EventAgenda = (props: any): React.ReactElement => {
  console.log('>>>>> agenda', props.event);
  return (
    <div className='EventAgenda'>
      <HorizontalSpace size='small'/>
      <SubTitle text={`Agenda de evento ${props.event.attributes.title}`} />
      <div className='row'>
        <div className='col s1 hide-on-small-only'></div>
        <div className='col s12 m10'>
          <TaskItem agenda={props.event.relationships.agenda_items.data}/>
        </div>
        <div className='col s1 hide-on-small-only'></div>
      </div>
    </div>
  );
};

export default EventAgenda;
