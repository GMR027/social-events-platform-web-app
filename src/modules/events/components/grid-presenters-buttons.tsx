import React from 'react';
import PresentButton from 'src/modules/events/components/presenter-button';

const GridPresentersButtons = (props: any): React.ReactElement => {
  return (
    <div className='StandGridItems'>
      <div className='row'>
      {
        props.presenter.data.map((element: any, index: number) => {
          return (
            <PresentButton
              key={index}
              slug='/'
              col='col s12 m2'
              image='https://media.informabtl.com/wp-content/uploads/2019/06/ce37e4ce-farmacias-del-ahorro.png'
              text='Nombre usuario'/>
          );
        })
      }
      </div>
    </div>
  );
};

export default GridPresentersButtons;