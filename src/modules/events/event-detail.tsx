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
import {
  EventDateParser
} from 'src/modules/utils/date-parser';
import innerSort from 'src/modules/utils/inner-sort';
import GeneralInformationComponent from 'src/modules/general-information-tab/general-information-tab';

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
    slug: '',
    start_date: '',
    end_date: '',
    video_live_link: '',
    address: '',
    facebook_link: '',
    twitter_link: '',
    instagram_link: '',
    youtube_link: '',
    img_rules: '',
    rules: '',
    img_dress_code: '',
    dress_code: '',
    img_travel_allowance: '',
    travel_allowance: ''
  },
  relationships: {
    pictures: {
      data: []
    },
    agenda_items: {
      data: []
    },
    agenda: [],
    zones: {
      data: []
    }
  }
};
// const mapImage = '/assets/map_icon.png';

// const rebuildZones = (zones: any) => {
//   const dataZones: any = {};
//   for (let j = 0; j < zones.length; j++) {
//     dataZones[zones[j].attributes.zone] = zones[j].attributes.zone;
//   }
// };

const orderAgenda = (data: any) => {
  const agenda = [...data];
  agenda.sort(innerSort('date'));
  const days: any = {};
  for (let i = 0; i < agenda.length; i++) {
    const d = new Date(agenda[i].attributes.date).getUTCDate();
    if ( !days.hasOwnProperty(d) ) days[d] = [];
    days[d].push(agenda[i]);
  }
  const daysArray = [];
  for (const j in days) {
    if (Object.prototype.hasOwnProperty.call(days, j)) {
      days[j].sort(innerSort('starting_time'));
      daysArray.push(days[j]);
    }
  }
  return daysArray;
};

const EventDetail = (props: any): React.ReactElement => {
  const tabsComponentRef: any = useRef(null);
  const history = useHistory();
  const params: any = useParams();
  const [event, setEvent] = useState(eventDetailData);
  const [expositors, setExpositors] = useState([]);

  useEffect(() => {
    M.Tabs.init(tabsComponentRef, {
      swipeable: true
    });
    fetchData(`events?filter[slug]=${params.eventId}&include=classification,pictures,agenda_items,agenda_items.expositor,zones`)
    .then((response: any) => {
      if (response.data.length === 0) {
        console.log('Error, evento no disponible');
        return history.replace('/');
      }
      const eventDetailData = response.data[0];
      if (!eventDetailData) return history.replace('/');
      eventDetailData.relationships.agenda = orderAgenda(eventDetailData.relationships.agenda_items.data);
      // props.event.relationships.zones.data = props.event.relationships.zones.data.sort(innerSort('zone'));
      setEvent(eventDetailData);
      props.setLogo(eventDetailData.attributes.img_logo);
      props.setLogoURL(`/${eventDetailData.attributes.slug}`);
      const expositors = response.included.filter((e: any) => e.type === 'Expositor' && !e.attributes.hidden );
      expositors.sort(innerSort('order'));
      setExpositors(expositors);
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
        location={EventDateParser(event.attributes.start_date, event.attributes.end_date)} />
      <div className='container'>
        <ul className='tabs Stand__tabs' ref={tabsComponentRef}>
          <li className='tab col s3'><a href='#inicio' className='active'>Inicio</a></li>
          <li className='tab col s3'><a href='#registro'>Registro</a></li>
          <li className='tab col s3'><a href='#agenda'>Agenda</a></li>
          <li className='tab col s3'><a href='#vestimenta'>Cód. de Vestimenta</a></li>
          <li className='tab col s3'><a href='#viaticos'>Viáticos</a></li>
          <li className='tab col s3'><a href='#normas'>Normas</a></li>
          <li className='tab col s3'><a href='#mapa'>Mapa</a></li>
          <li className='tab col s3'><a href='#galeria'>Galería</a></li>
        </ul>
        <div id='inicio' className='col s12 row'>
          <div className='col s12'>
            <HorizontalSpace size='small'/>
            <CommonLargeText text={event.attributes.description} />
            <HorizontalSpace size='large'/>
          </div>
          <SubTitle text='Presentadores'/>
          <div className='row'>
          {
            expositors.map((e: any, index: number) => {
              return (
                <Expositor key={index} size='col s6 m3' image={e.attributes.img_picture}
                  text={e.attributes.title} link={e.attributes.link} colorAccess='red-text text-darken-2' />
              );
            })
          }
          </div>
          <div className='col s12'>
            <HorizontalSpace size='x-small'/>
          </div>
        </div>
        <div id='registro' className='col s12'>
          <EventRegistration event={event}
            responsiveLetter={event.attributes.responsive_letter}
            eventId={event.id}
            eventName={event.attributes.title} />
          <HorizontalSpace size='x-small'/>
        </div>
        <div id='agenda' className='col s12'>
          <EventAgenda event={event} expositors={expositors} />
          <HorizontalSpace size='x-small'/>
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
        <div id='vestimenta' className='col s12'>
          <GeneralInformationComponent
            title='Código de Vestimenta'
            img={event.attributes.img_dress_code}
            content={event.attributes.dress_code} />
          <HorizontalSpace size='x-small'/>
        </div>
        <div id='viaticos' className='col s12'>
          <GeneralInformationComponent
            title='Solicitud de Viáticos'
            img={event.attributes.img_travel_allowance}
            content={event.attributes.travel_allowance} />
          <HorizontalSpace size='x-small'/>
        </div>
        <div id='normas' className='col s12'>
          <GeneralInformationComponent
            title='Normas'
            img={event.attributes.img_rules}
            content={event.attributes.rules} />
          <HorizontalSpace size='x-small'/>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
