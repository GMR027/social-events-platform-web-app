import React from 'react';
import EventItem from 'src/modules/events/event-item';
import 'src/modules/events/events.scss';
import { ShortDateParser } from 'src/modules/utils/date-parser';

const EventsGrid = (props: any): React.ReactElement => {
  return (
    <div className='StandGridItems'>
      <div className='row'>
      {
        props.events.data.map((event: any, index: number) => {
          return (
            <EventItem
              key={index}
              col='col s12 m4'
              slug={event.attributes.slug}
              imgPicture={event.attributes.img_picture}
              title={event.attributes.title}
              dateEvent={`${
                event.attributes.start_date ? ShortDateParser(event.attributes.start_date) : null
              } al ${
                event.attributes.end_date ? ShortDateParser(event.attributes.end_date) : null
              }`}
              city={event.attributes.city}/>
          );
        })
      }
      </div>
    </div>
  );
};

export default EventsGrid;
