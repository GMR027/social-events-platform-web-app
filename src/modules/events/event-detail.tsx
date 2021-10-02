import React, {
    useRef,
    useEffect,
    useState
  } from 'react';
import * as M from 'materialize-css';
import ParallaxHeaderImage from 'src/modules/parallax-header-image/parallax-header-image';
import QRCodeComponent from 'src/modules/events/components/code-qr';
import GalleryPictures from 'src/modules/events/components/gallery-pictures';
import CommonLargeText from 'src/modules/events/components/common-large-text';
import EventRegistration from 'src/modules/forms/event-registration';
import PresentButton from 'src/modules/events/components/presenter-button';
import {
  useHistory,
  useParams
} from 'react-router-dom';
import fetchData from 'src/modules/utils/fetch-data';
import ImageSimple from 'src/modules/events/components/image-simple';
import HorizontalSpace from 'src/modules/horizontal-space/horizontal-space';
import SubTitle from 'src/modules/sub-title/sub-title';

  const eventDataDetail = {
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

  const EventDetail = (props: any): React.ReactElement => {
    const tabsComponentRef: any = useRef(null);
    useEffect(() => {
      M.Tabs.init(tabsComponentRef, {
        swipeable: true
      });
    }, [M]);
    const history = useHistory();
    const params: any = useParams();
    const [detail, setDetail] = useState(eventDataDetail);

    useEffect(() => {
      fetchData(`events?filter[slug]=${params.eventId}&include=classification,pictures,agenda_items,agenda_items.expositor`)
      .then((response: any) => {
        if (response.data.length === 0) {
          console.log('Error, evento no disponible');
        } else {
          const eventDataDetail = response.data[0];
          if (!eventDataDetail) return history.replace('/');
          console.log('Evento', eventDataDetail);
          setDetail(eventDataDetail);
        }
      })
      .catch((error) => {
        console.log('Hubo un error', error);
      });
    }, [fetchData]);


    return (
      <div className='Stand'>
          <ParallaxHeaderImage
            size='xx-small'
            image={detail.attributes.img_cover}
            title={detail.attributes.title} />
        <div className='container'>
          <ul className='tabs Stand__tabs' ref={tabsComponentRef}>
            <li className='tab col s3'><a href='#test1' className='active'>Inicio</a></li>
            <li className='tab col s3'><a href='#test2'>Registro</a></li>
            <li className='tab col s3'><a href='#test3'>Agenda</a></li>
            <li className='tab col s3'><a href='#test4'>Mapa</a></li>
            <li className='tab col s3'><a href='#test5'>Galería</a></li>
          </ul>
          <div id='test1' className='col s12 row'>
              <CommonLargeText text={detail.attributes.description} />
              <QRCodeComponent title={`QR code de ${props.nombre}`}/>
              <HorizontalSpace size='small'/>
              <SubTitle text='Presentadores'/>
              <PresentButton
                size='col s12 m3'
                image='https://www.elsiglodetorreon.com.mx/m/i/2017/10/987936.jpeg'
                text='Franco Escamilla'
                colorAcces='red-text text-darken-2'
                textAcces='Acceder' />
              <PresentButton
                size='col s12 m3'
                image='https://los40.com/los40/imagenes/2021/09/10/musica/1631293030_656860_1631293480_gigante_normal.jpg'
                text='Rhiana'
                colorAcces='red-text text-darken-2'
                textAcces='Acceder' />
              <PresentButton
                size='col s12 m3'
                image='https://static01.nyt.com/images/2017/05/27/arts/27SHAKIRA/27SHAKIRA-superJumbo.jpg'
                text='Shakira'
                colorAcces='red-text text-darken-2'
                textAcces='Acceder' />
              <PresentButton
                size='col s12 m3'
                image='https://los40.com/los40/imagenes/2021/09/10/musica/1631293030_656860_1631293480_gigante_normal.jpg'
                text='Rhiana'
                colorAcces='red-text text-darken-2'
                textAcces='Acceder' />
          </div>
          <div id='test2' className='col s12'>
            <EventRegistration file={detail.attributes.responsive_letter}/>
          </div>
          <div id='test3' className='col s12'>Agenda</div>
          <div id='test4' className='col s12'>
            <ImageSimple imageSimple={detail.attributes.map}/>
          </div>
          <div id='test5' className='col s12'>
            <GalleryPictures images={detail.relationships.pictures.data} />
          </div>
        </div>
      </div>
    );
  };

  export default EventDetail;
