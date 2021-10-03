import React, {
    useRef,
    useEffect,
    useState
  } from 'react';
import * as M from 'materialize-css';
import ParallaxHeaderImage from 'src/modules/parallax-header-image/parallax-header-image';
import GalleryPictures from 'src/modules/events/components/gallery-pictures';
import CommonLargeText from 'src/modules/events/components/common-large-text';
import EventRegistration from 'src/modules/forms/event-registration';
import Expositor from 'src/modules/events/components/expositor';
import {
  useHistory,
  useParams
} from 'react-router-dom';
import fetchData from 'src/modules/utils/fetch-data';
import ImageSimple from 'src/modules/events/components/image-simple';
import HorizontalSpace from 'src/modules/horizontal-space/horizontal-space';
import SubTitle from 'src/modules/sub-title/sub-title';

const eventDetailData = {
  id: '',
  attributes: {
    title: '',
    description: '',
    img_cover: '',
    responsive_letter: '',
    map: ''
  },
  relationships: {
    pictures: {
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
        console.log('Evento', response);
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
        size='xx-small'
        image={event.attributes.img_cover}
        title={event.attributes.title} />
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
          {
            expositors.map((e: any, index: number) => {
              return (
                <Expositor
                  key={index}
                  size='col s12 m3'
                  image={e.attributes.img_picture}
                  text={e.attributes.title}
                  link={e.attributes.link}
                  colorAcces='red-text text-darken-2'
                  textAcces='Ver mas' />
              );
            })
          }
        </div>
        <div id='test2' className='col s12'>
          <EventRegistration
            responsiveLetter={event.attributes.responsive_letter}
            eventId={event.id}/>
        </div>
        <div id='test3' className='col s12'>Agenda</div>
        <div id='test4' className='col s12'>
          <ImageSimple imageSimple={event.attributes.map}/>
        </div>
        <div id='test5' className='col s12'>
          <GalleryPictures images={event.relationships.pictures.data} />
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
