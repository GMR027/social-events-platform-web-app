import React from 'react';
import { Link } from 'react-router-dom';
import 'src/modules/events/events.scss';
import CardIndicator from 'src/modules/card-indicator/card-indicator';
import 'src/modules/card-indicator/card-indicator.scss';

const EventItem = (props: any): React.ReactElement => {
  return (
    <Link
      to={`/${props.slug}`}>
      <div className={`EventItem ${props.col}`}>
        <div className='EventItem__card'>
          <div
            className='EventItem__img'
            style={{backgroundImage: `url(${props.imgPicture})`}}>
              <CardIndicator
              colorIndicator='red darken-2'
              icon='pin_drop'
              text={props.city} />
          </div>
          <div className='grey-text text-darken-4 truncate EventItem__title'>
            {props.title}
          </div>
          <div className='EventItem__dateEvent grey-text text-darken-1'>{props.dateEvent}</div>
          <div className='EventItem__text red-text text-darken-2'>Ir al evento</div>
        </div>
      </div>
    </Link>
  );
};

export default EventItem;
