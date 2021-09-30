import React, {
  useEffect,
  useRef,
  useState
} from 'react';
import fetchData from 'src/modules/utils/fetch-data';
import HorizontalSpace from 'src/modules/horizontal-space/horizontal-space';
import { useSelector } from 'react-redux';
import SubTitle from 'src/modules/sub-title/sub-title';
import ParallaxHeaderImage from 'src/modules/parallax-header-image/parallax-header-image';
import * as M from 'materialize-css';
import {
  DateParser
} from 'src/modules/utils/date-parser';
import 'src/modules/changelog/changelog.scss';
import {
  getIcon,
  getType
} from 'src/modules/changelog/helpers';

const headerPictureFile = '/assets/login.jpg';
const changeLogData = {
  data: []
};

const TaskItem = ( props: any ): React.ReactElement => {
  const tableRef: any = useRef(null);

  useEffect(() => {
    M.Collapsible.init(tableRef.current, {});
  }, [M]);

  return (
    <ul className='collapsible' ref={tableRef}>
    {
      props.items.data.map((i: any, index: number) => {
        return (
          <li key={index}>
            <div className='collapsible-header ChangeLog__header'>
              <i className={`material-icons ChangeLog__icon--${i.attributes.type}`}>
                {getIcon(i.attributes.type)}
              </i>
              <div className='ChangeLog__task-name'>
                <span>{i.attributes.task_name}</span>
                <span className='hide-on-small-only'> ({i.attributes.hours} hora{i.attributes.hours !== 1 ? 's' : ''})</span>
              </div>
              <span className='ChangeLog__user-name hide-on-small-only'>
                {i.relationships.user.data.attributes.first_name}
              </span>
            </div>
            <div
              className='collapsible-body ChangeLog__description'>
                <div>
                  <b>Autor:</b> {i.relationships.user.data.attributes.first_name} {i.relationships.user.data.attributes.last_name}
                </div>
                <div>
                  <b>Tipo de tarea:</b> {getType(i.attributes.type)}
                </div>
                <div>
                  <b>Tiempo de desarrollo:</b> {i.attributes.hours} hora{i.attributes.hours !== 1 ? 's' : ''}
                </div>
                <div><b>Comentarios:</b></div>
                <div dangerouslySetInnerHTML={{
                  __html: i.attributes.description
                }}></div>
              </div>
          </li>
        );
      })
    }
    </ul>
  );
};

const ChangeLog = (): React.ReactElement => {
  const system = useSelector((state: any) => state.system);
  const prefix = system.platform.prefix;
  const headerPictureURL = `${prefix}${headerPictureFile}`;
  const [items, setitems]: any = useState(changeLogData);

  useEffect(() => {
    fetchData('sprints/?include=tasks,tasks.user')
      .then((response: any) =>{
        setitems(response);
      });
  }, [fetchData]);

  return (
    <>
      <ParallaxHeaderImage
        image={headerPictureURL}
        gradientOpacity='0.2'
        size='x-small'
        title='Change Log' />
      <HorizontalSpace size='medium' />
      <div className='container ChangeLog'>
      {
        items.data.map((i: any, index: number) => {
          let totalTime = 0;
          i.relationships.tasks.data.forEach((e: any) => {
            totalTime += e.attributes.hours;
          });

          return (
            <div key={index}>
              <SubTitle
                text={i.attributes.name}
                fullWidth={true}
                align='left' />
              <span className='grey-text text-darken-3'>
                De {DateParser(i.attributes.date_start)} a {DateParser(i.attributes.date_end)}
              </span>
              <br />
              <span className='grey-text text-darken-3'>
                Tiempo total de desarrollo: <b>{totalTime} horas.</b>
              </span>
              {
                i.attributes.comments ?
                  <div
                    className='grey-text text-darken-3'
                    dangerouslySetInnerHTML={{
                      __html: i.attributes.comments
                  }}></div> : <HorizontalSpace size='x-small' />
              }
              <TaskItem items={i.relationships.tasks}/>
              <HorizontalSpace size='small' />
            </div>
          );
        })
      }
      </div>
      <HorizontalSpace size='small' />
    </>
  );
};

export default ChangeLog;
