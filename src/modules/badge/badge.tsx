import React, {
  useEffect,
  useState
} from 'react';
import {
  useHistory,
  useParams
} from 'react-router-dom';
import 'src/modules/badge/badge.scss';
import QRCodeComponent from 'src/modules/events/components/code-qr';
import fetchData from 'src/modules/utils/fetch-data';

const badgeData = {
  attributes: {
    img_user: '',
    first_name: '',
    last_name: '',
    identifier: ''
  },
  relationships: {
    event: {
      data: {
        attributes: {
          img_badge: ''
        }
      }
    }
  }
};

const Badge = (props: any): React.ReactElement => {
  const history = useHistory();
  const params: any = useParams();
  const [badge, setBadge] = useState(badgeData);
  const [canonicalURL, setCanonicalURL] = useState('');

  useEffect(() => {
    setCanonicalURL(window.location.href);
  });

  useEffect(() => {
    fetchData(`user-registrations/?filter[identifier]=${params.badgetId}&include=event`)
    .then((response: any) => {
      if (response.data.length === 0) {
        console.log('Error, evento no disponible');
      } else {
        const badgeData = response.data[0];
        if (!badgeData) return history.replace('/');
        setBadge(badgeData);
      }
    })
    .catch((error) => {
      console.log('Hubo un error', error);
    });
  }, [fetchData]);

  return (
    <div className='Badge'>
      <div
        className={`Badge__image ${props.className}`}
        style={{backgroundImage: `url(${badge.relationships.event.data.attributes.img_badge})`}}>
        <div
          className='Badge__imageProfile'
          style={{backgroundImage: `url(${badge.attributes.img_user})`}}></div>
        <div className='Badge__name'>{badge.attributes.first_name} {badge.attributes.last_name}</div>
        <div className='Badge__qr'>
          <QRCodeComponent value={`${canonicalURL}/check-in`} />
        </div>
      </div>
    </div>
  );
};

export default Badge;
