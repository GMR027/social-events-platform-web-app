import React, {
  useEffect,
  useState
} from 'react';
import SubTitle from 'src/modules/sub-title/sub-title';
import QRCode from 'qrcode.react'; // https://www.npmjs.com/package/qrcode.react
import 'src/modules/events/components/code-qr.scss';

const QRCodeComponent = ( props: any ): React.ReactElement => {
  const [canonicalURL, setCanonicalURL] = useState('');

  useEffect(() => {
    setCanonicalURL(window.location.href);
  });

  return (
    <div className='container QRCode'>
      <SubTitle text={props.title} />
      <div className='QrCodeComponent'>
        <QRCode
          value={canonicalURL}
          size={200}
          bgColor='#FFFFFF'
          fgColor={props.color} />
        </div>
    </div>
  );
};

export default QRCodeComponent;
