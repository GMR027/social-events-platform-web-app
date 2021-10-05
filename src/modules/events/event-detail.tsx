import React, {
    useRef,
    useEffect,
    useState
  } from 'react';
import * as M from 'materialize-css';
import ParallaxHeaderImage from 'src/modules/parallax-header-image/parallax-header-image';
import GalleryPictures from 'src/modules/events/components/gallery-pictures';
import CommonLargeText from 'src/modules/events/components/common-large-text';
import EventRegistration from 'src/modules/events/components/event-registration';
import Expositor from 'src/modules/events/components/expositor';
import {
  useHistory,
  useParams
} from 'react-router-dom';
import fetchData from 'src/modules/utils/fetch-data';
import ImageSimple from 'src/modules/events/components/image-simple';
import HorizontalSpace from 'src/modules/horizontal-space/horizontal-space';
import SubTitle from 'src/modules/sub-title/sub-title';
import EventAgenda from 'src/modules/events/components/event-agenda';
import { DateParser } from 'src/modules/utils/date-parser';

const eventDetailData = {
  id: '',
  attributes: {
    title: '',
    description: '',
    img_cover: '',
    img_logo: '',
    responsive_letter: '',
    map: '',
    city: '',
    start_date: '',
    end_date: ''
  },
  relationships: {
    pictures: {
      data: []
    },
    agenda_items: {
      data: []
    }
  }
};

const EventDetail = (): React.ReactElement => {
  const tabsComponentRef: any = useRef(null);
  const history = useHistory();
  const params: any = useParams();
  const [event, setDetail] = useState(eventDetailData);
  const [expositors, setExpositors] = useState([]);

  useEffect(() => {
    M.Tabs.init(tabsComponentRef, {
      swipeable: true
    });
    fetchData(`events?filter[slug]=${params.eventId}&include=classification,pictures,agenda_items,agenda_items.expositor`)
    .then((response: any) => {
      if (response.data.length === 0) {
        console.log('Error, evento no disponible');
      } else {
        const eventDetailData = response.data[0];
        if (!eventDetailData) return history.replace('/');
        setDetail(eventDetailData);
        setExpositors(response.included.filter((e: any) => e.type === 'Expositor'));
      }
    })
    .catch((error) => {
      console.log('Hubo un error', error);
    });
  }, [fetchData, M]);

  return (
    <div>
      <ParallaxHeaderImage
        size='small'
        image={event.attributes.img_cover}
        title={event.attributes.title}
        location={`${event.attributes.city} - del ${
          event.attributes.start_date ? DateParser(event.attributes.start_date) : null
        } al ${
          event.attributes.end_date ? DateParser(event.attributes.end_date) : null
        }`} />
      <div className='container'>
        <ul className='tabs Stand__tabs' ref={tabsComponentRef}>
          <li className='tab col s3'><a href='#test1' className='active'>Inicio</a></li>
          <li className='tab col s3'><a href='#test2'>Registro</a></li>
          <li className='tab col s3'><a href='#test3'>Agenda</a></li>
          <li className='tab col s3'><a href='#test4'>Mapa</a></li>
          <li className='tab col s3'><a href='#test5'>Galería</a></li>
        </ul>
        <div id='test1' className='col s12 row'>
          <CommonLargeText text={event.attributes.description} />
          <HorizontalSpace size='small'/>
          <SubTitle text='Presentadores'/>
          <div className='row'>
          {
            expositors.map((e: any, index: number) => {
              return (
                <Expositor
                  key={index}
                  size='col s12 m3'
                  image={e.attributes.img_picture}
                  text={e.attributes.title}
                  link={e.attributes.link}
                  colorAccess='red-text text-darken-2'
                  textAccess='Ver mas' />
              );
            })
          }
          </div>
          <HorizontalSpace size='x-small'/>
        </div>
        <div id='test2' className='col s12'>
          <EventRegistration
            responsiveLetter={event.attributes.responsive_letter}
            eventId={event.id}
            eventName={event.attributes.title} />
          <HorizontalSpace size='x-small'/>
        </div>
        <div id='test3' className='col s12'>
          <EventAgenda event={event}/>
        </div>
        <div id='test4' className='col s12'>
          <HorizontalSpace size='small'/>
          <SubTitle text={`Mapa del evento ${event.attributes.title}`} />
          <ImageSimple imageSimple={event.attributes.map}/>
          <HorizontalSpace size='x-small'/>
        </div>
        <div id='test5' className='col s12'>
          <HorizontalSpace size='small'/>
          <SubTitle text={`Galeria del evento ${event.attributes.title}`} />
          <GalleryPictures images={event.relationships.pictures.data} />
          <HorizontalSpace size='x-small'/>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
