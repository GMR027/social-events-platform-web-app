import React from 'react';
import 'src/modules/parallax-header-image/parallax-header-image.scss';
import Title from 'src/modules/title/title';

const ParallaxHeaderImage = (props: any): React.ReactElement => {
  return (
    <div>
      <div
        className={`ParallaxHeaderImage${props.size ? `--${props.size}` : ''}`}
        style={{backgroundImage: `url(${props.image})`}}>
        {/* <div
          className='IndicatorEventCity container'>
            <div className='IndicatorEventCity__indicator red darken-2'>
              <div className='IndicatorEventCity__textIcon white-text'>
                <i className='material-icons left'>pin_drop</i>{props.city}
              </div>
            </div>
          </div> */}
        <div
          className='ParallaxHeaderImage__info'
          style={{
            backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, ${props.gradientOpacity ? props.gradientOpacity : '0.65'}), rgba(0, 0, 0, 0))`
          }}>
          <div className='container'>
            {
              props.restaurant ?
              <div className='Restaurant red'>
                <div className='Restaurant__icon'>
                  <i className='material-icons center white-text'>{props.restaurantIcon}</i>
                </div>
              </div> : null
            }
            <div>
              {
                props.logo ?
                <div className='LogoStand white'>
                  <div
                    className='LogoStand__img'
                    style={{backgroundImage: `url(${props.logo})`}}>
                  </div>
                </div> : null
              }
            </div>
            <Title
              text={props.title}
              align='left'
              fullWidth={true}
              shadow={true} />
            { props.location ?
              <span className='ParallaxHeaderImage__email white-text'>{props.location}</span> : null
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParallaxHeaderImage;
