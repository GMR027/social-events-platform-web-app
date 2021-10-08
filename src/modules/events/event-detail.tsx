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
import CardVertical from 'src/modules/card-vertical/card-vertical';
import { useSelector } from 'react-redux';

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
    end_date: '',
    video_live_link: '',
    address: '',
    facebook_link: '',
    twitter_link: '',
    instagram_link: '',
    youtube_link: ''
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

const mapImage = '/assets/map_icon.png';

const EventDetail = (props: any): React.ReactElement => {
  const system = useSelector((state: any) => state.system);
  const prefix = system.platform.prefix;
  const tabsComponentRef: any = useRef(null);
  const history = useHistory();
  const params: any = useParams();
  const [event, setEvent] = useState(eventDetailData);
  const [expositors, setExpositors] = useState([]);
  const mapImageURL = `${prefix}${mapImage}`;

  useEffect(() => {
    M.Tabs.init(tabsComponentRef, {
      swipeable: true
    });
    fetchData(`events?filter[slug]=${params.eventId}&include=classification,pictures,agenda_items,agenda_items.expositor`)
    .then((response: any) => {
      if (response.data.length === 0) {
        console.log('Error, evento no disponible');
        return history.replace('/');
      }
      const eventDetailData = response.data[0];
      if (!eventDetailData) return history.replace('/');
      setEvent(eventDetailData);
      props.setLogo(eventDetailData.attributes.img_logo);
      props.setLogoURL(`/${eventDetailData.attributes.slug}`);
      setExpositors(response.included.filter((e: any) => e.type === 'Expositor'));
    })
    .catch((error) => {
      console.log('Hubo un error', error);
      return history.replace('/');
    });
  }, [fetchData, M]);

  return (
    <div>
      <ParallaxHeaderImage
        size='medium'
        image={event.attributes.img_cover}
        title={event.attributes.title}
        city={event.attributes.city}
        location={`Del ${
          event.attributes.start_date ? DateParser(event.attributes.start_date) : null
        } al ${
          event.attributes.end_date ? DateParser(event.attributes.end_date) : null
        }`} />
      <div className='container'>
        <ul className='tabs Stand__tabs' ref={tabsComponentRef}>
          <li className='tab col s3'><a href='#inicio' className='active'>Inicio</a></li>
          <li className='tab col s3'><a href='#registro'>Registro</a></li>
          <li className='tab col s3'><a href='#agenda'>Agenda</a></li>
          <li className='tab col s3'><a href='#mapa'>Mapa</a></li>
          <li className='tab col s3'><a href='#galeria'>Galería</a></li>
        </ul>
        <div id='inicio' className='col s12 row'>
          <div className="col s12 m9">
            <CommonLargeText text={event.attributes.description} />
          </div>
          <div className='col s12 m3 container'>
            <CardVertical
              margin='2em 0 0'
              borderRadius='8px'
              padding='1em .5em .5em'
              live={event.attributes.video_live_link}
              mapImage={mapImageURL}
              borderRadiusMapImage='35px'
              mapAddress={event.attributes.address}
              linkFacebook={event.attributes.facebook_link}
              linkImstagram={event.attributes.instagram_link}
              linktwitter={event.attributes.twitter_link}
              linkYoutube={event.attributes.youtube_link} />
              <HorizontalSpace size='large'/>
          </div>
          <SubTitle text='Presentadores'/>
          <div className='row'>
          {
            expositors.map((e: any, index: number) => {
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
          <HorizontalSpace size='x-small'/>
        </div>
        <div id='registro' className='col s12'>
          <EventRegistration
            responsiveLetter={event.attributes.responsive_letter}
            eventId={event.id}
            eventName={event.attributes.title} />
          <HorizontalSpace size='x-small'/>
        </div>
        <div id='agenda' className='col s12'>
          <EventAgenda event={event} expositors={expositors} />
        </div>
        <div id='mapa' className='col s12'>
          <HorizontalSpace size='small'/>
          <SubTitle text={`Mapa de ${event.attributes.title}`} />
          <ImageSimple imageSimple={event.attributes.map}/>
          <HorizontalSpace size='x-small'/>
        </div>
        <div id='galeria' className='col s12'>
          <HorizontalSpace size='small'/>
          <SubTitle text={`Galeria de ${event.attributes.title}`} />
          <GalleryPictures images={event.relationships.pictures.data} />
          <HorizontalSpace size='x-small'/>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
