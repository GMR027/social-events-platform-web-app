import React, {
  useRef,
  useEffect
} from 'react';
import * as M from 'materialize-css';
import 'src/modules/ratings/ratings.scss';

const Ratings = (props: any): React.ReactElement => {
  const starComponentRef: any = useRef(null);
  useEffect(() => {
    M.Tooltip.init(starComponentRef, {});
  }, [M]);

  const score = props.score > 5 ? 5 : props.score;
  const scoreOn = Math.round(score);
  const stars = [];
  for (let i = 0; i < 5; i++) {
    const star = {
      index: i + 1,
      on: false
    };
    if ( i < scoreOn ) star.on = true;
    stars.push(star);
  }
  const colorOn = props.colorOn ? props.colorOn : 'yellow-text text-darken-2';
  const colorOff = props.colorOn ? props.colorOn : 'white-text';
  const size = props.size ? props.size : 'medium';

  return (
    <div
      className='tooltipped Ratings'
      data-position='bottom'
      data-tooltip={props.tooltip}
      ref={starComponentRef}>
      {
        stars.map((i: any) => {
          return (
            <em
              key={i.index}
              onClick={ props.onClick ? () => {
                props.onClick(i.index);
              } : () => null }
              className={`material-icons Ratings__star Ratings__star--${size} ${
                i.on ? colorOn : colorOff
              }`}>star</em>
          );
        })
      }
    </div>
  );
};

export default Ratings;

