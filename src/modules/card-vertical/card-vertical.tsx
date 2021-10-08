import React from 'react';
import 'src/modules/card-vertical/card-vertical.scss';
import HorizontalSpace from 'src/modules/horizontal-space/horizontal-space';
import LinkIconImage from 'src/modules/link-icon-image/link-icon-image';
import { useSelector } from 'react-redux';

const facebook = '/assets/facbook_icon.png';
const imstagram = '/assets/imstagram_icon.png';
const twitter = '/assets/twitter__icon.png';
const youtube = '/assets/youtube_icon.png';

const CardVertical = (props: any): React.ReactElement => {
  const system = useSelector((state: any) => state.system);
  const prefix = system.platform.prefix;
  const facebookURL = `${prefix}${facebook}`;
  const imstragramURL = `${prefix}${imstagram}`;
  const twitterURL = `${prefix}${twitter}`;
  const youtubeURL = `${prefix}${youtube}`;

  return (
    <div
      style={{
        margin: props.margin,
        borderRadius: props.borderRadius,
        padding: props.padding
      }}
      className={`CardVertical ${props.colorCard}`}>
      <HorizontalSpace size='xx-small'/>
      <div className='center-align'>
        <a
          href='/evento/farmacias-del-ahorro-2021#registro'
          target='_blank'
          rel='noreferrer'
          className="red white-text btn pulse">Registrarme al evento</a>
      </div>
      <HorizontalSpace size='xx-small'/>
      {
        props.live ?
          <div className='CardVertical__live'>
            <div className="CardVerticalFlex">
              <a className='CardVertical__liveText red-text' href={props.live} target='_blank' rel='noreferrer' >
                <i className='red-text material-icons'>ondemand_video</i>Video en vivo
              </a>
            </div>
          </div> : null
      }
      <HorizontalSpace size='xx-small'/>
      <a
        href={`https://www.google.com/maps?q=${props.mapAddress}`}
        target='_blank'
        rel='noreferrer'>
        <div
          className='CardVertical__mapImage'
          style={{
            backgroundImage: `url(${props.mapImage})`,
            borderRadius: props.borderRadiusMapImage}}>
        </div>
        <p className='center-align grey-text text-darken-2'>Clic para ver mapa</p>
        <p className='center-align grey-text text-darken-2'>{props.mapAddress}</p>
      </a>
      <HorizontalSpace size='xx-small'/>
      <div className="center-align">
      <LinkIconImage
        linkImage={facebookURL}
        borderRadiusMapImage='8px'
        size='40px'
        justifyimage='contain'
        link={props.linkFacebook} />
      <LinkIconImage
        linkImage={imstragramURL}
        borderRadiusMapImage='6px'
        size='40px'
        justifyimage='75%'
        link={props.linkImstagram} />
      <LinkIconImage
        linkImage={twitterURL}
        borderRadiusMapImage='6px'
        size='40px'
        justifyimage='75%'
        link={props.linktwitter} />
      <LinkIconImage
        linkImage={youtubeURL}
        borderRadiusMapImage='6px'
        size='40px'
        justifyimage='75%'
        link={props.linkYoutube} />
      </div>
      <HorizontalSpace size='xx-small'/>
    </div>
  );
};

export default CardVertical;
