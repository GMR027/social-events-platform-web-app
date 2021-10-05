import React, {
  useRef,
  useEffect
} from 'react';
import HorizontalSpace from 'src/modules/horizontal-space/horizontal-space';
import SubTitle from 'src/modules/sub-title/sub-title';
import 'src/modules/events/components/event-agenda.scss';
import * as M from 'materialize-css';
import {
  DayMonthParser,
  TimeParser
} from 'src/modules/utils/date-parser';
import Expositor from 'src/modules/events/components/expositor';

const TaskItem = ( props: any ): React.ReactElement => {
  const tableRef: any = useRef(null);

  useEffect(() => {
    M.Collapsible.init(tableRef.current, {});
  }, [M]);

  return (
    <>
      <ul className='collapsible' ref={tableRef}>
      {
        props.agenda.map((i: any, index: number) => {
          return (
            <li key={index}>
              <div className='collapsible-header EventAgenda__header'>
                <i
                  className='EventAgenda__expositor-icon'
                  style={{
                    backgroundImage: `url(${i.relationships.expositor.data.attributes.img_picture})`
                  }}></i>
                <div className='EventAgenda__name'>
                  <span><b>{i.attributes.title}</b></span><br/>
                  <span>{DayMonthParser(i.attributes.date)} - {TimeParser(i.attributes.starting_time)} a {TimeParser(i.attributes.ending_time)}</span>
                </div>
                <div className='EventAgenda__date-time hide-on-small-only red-text'>
                  <div><i className='material-icons'>location_on</i><span>{i.attributes.location}</span></div>
                  {
                    i.attributes.video_live_link ?
                      <div><i className='material-icons'>ondemand_video</i><span>Video en vivo!</span></div>
                      : <div>&#8194;</div>
                  }
                </div>
              </div>
              <div className='collapsible-body EventAgenda__description'>
                <span className='EventAgenda__attribute'><b>Conduccion:</b> {i.relationships.expositor.data.attributes.title}</span>
                <span className='EventAgenda__attribute'><b>Lugar:</b> {i.attributes.location}</span>
                {
                  i.attributes.video_live_link ?
                    <div className='EventAgenda__attribute'>
                      <b>Video en vivo:</b> <a href={i.attributes.video_live_link} target='_blank' rel='noreferrer'>Click aqui</a>
                    </div> : null
                }
                {
                  i.attributes.map ?
                    <div className='EventAgenda__attribute'>
                      <b>Mapa</b> <a href={i.attributes.map} target='_blank' rel='noreferrer'>Click aqui</a>
                    </div> : null
                }
                <div dangerouslySetInnerHTML={{
                  __html: i.attributes.description
                }}></div>
              </div>
            </li>
          );
        })
      }
      </ul>
    </>
  );
};

const EventAgenda = (props: any): React.ReactElement => {
  console.log('>>>>> agenda', props.event);
  return (
    <div className='EventAgenda'>
      <HorizontalSpace size='small'/>
      <SubTitle text={`Agenda de ${props.event.attributes.title}`} />
      <div className='row'>
        <div className='col s1 hide-on-small-only'></div>
        <div className='col s12 m10'>
          <TaskItem agenda={props.event.relationships.agenda_items.data}/>
        </div>
        <div className='col s1 hide-on-small-only'></div>
      </div>
      <HorizontalSpace size='small'/>
      <SubTitle text='Presentadores'/>
      <div className='row'>
      {
        props.expositors.map((e: any, index: number) => {
          return (
            <Expositor
              key={index}
              size='col s6 m3'
              image={e.attributes.img_picture}
              text={e.attributes.title}
              link={e.attributes.link}
              colorAccess='red-text text-darken-2'
              textAccess='Ver mas' />
          );
        })
      }
      </div>
    </div>
  );
};

export default EventAgenda;
