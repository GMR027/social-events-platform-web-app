import React from 'react';
import EventItem from 'src/modules/events/event-item';
import 'src/modules/events/events.scss';

const EventsGrid = (props: any): React.ReactElement => {
  return (
    <div className='StandGridItems'>
      <div className='row'>
      {
        props.events.data.map((element: any, index: number) => {
          return (
            <EventItem
              key={index}
              col='col s12 m4'
              slug={element.attributes.slug}
              imgPicture={element.attributes.img_picture}
              title={element.attributes.title}
              city={element.attributes.city}/>
          );
        })
      }
      </div>
    </div>
  );
};

export default EventsGrid;
