import React, {
  useState
} from 'react';
import {
  Swiper,
  SwiperSlide
} from 'swiper/react';
import { useSelector } from 'react-redux';
import 'src/modules/events/components/gallery-pictures.scss';

const sliderNextButtonFile = '/assets/slider-button-next.svg';
const sliderPrevButtonFile = '/assets/slider-button-prev.svg';

const SlideAddons = ( props: any ): React.ReactElement => {
  const system = useSelector((state: any) => state.system);
  const prefix = system.platform.prefix;
  const sliderNextButtonFileURL = `${prefix}${sliderNextButtonFile}`;
  const sliderPrevButtonFileURL = `${prefix}${sliderPrevButtonFile}`;
  const swiper = props.swiper;

  return (
    <>
      <div
        className='Swiper__navigation-button Swiper__navigation-button--left z-depth-2'
        style={{ backgroundImage: `url(${sliderPrevButtonFileURL})` }}
        onClick={() => {
          if ( swiper ) swiper.slidePrev();
        }}></div>
      <div
        className='Swiper__navigation-button Swiper__navigation-button--right z-depth-2'
        style={{ backgroundImage: `url(${sliderNextButtonFileURL})` }}
        onClick={() => {
          if ( swiper ) swiper.slideNext();
        }}></div>
      <div className='swiper-pagination'></div>
    </>
  );
};

const GalleryPictures = (props: any): React.ReactElement => {
  const [swiperReference, setSwiperReference]: any = useState(null);

  const onSwiper = ( swiper: any ) => {
    setSwiperReference(swiper);
  };

  return (
    <div className='StandPictures z-depth-2'>
      <Swiper
        className='Swiper'
        autoplay={true}
        effect='slide'
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        onSwiper={onSwiper}
        pagination={{
          el: '.swiper-pagination', type: 'bullets', clickable: true
        }}
      >
        {
          props.images.map((item: any, index: any ) => {
            if ( !item.attributes ) return null;
            return (
              <SwiperSlide
                className='Swiper__slide'
                key={index}
                virtualIndex={index}>
                <div
                  className='Swiper__content'
                  style={{
                    backgroundImage: `url(${item.attributes.img_picture})`
                  }}>
                </div>
              </SwiperSlide>
            );
          })
        }
        <SlideAddons swiper={swiperReference} />
      </Swiper>
    </div>
  );
};

export default GalleryPictures;
