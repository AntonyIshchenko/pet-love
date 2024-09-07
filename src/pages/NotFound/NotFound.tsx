import { Link } from 'react-router-dom';
import css from './NotFound.module.css';

import notFoundDesk from '@images/404-desk.png';
import notFoundDesk2x from '@images/404-desk@2x.png';
import notFoundMob from '@images/404-mob.png';
import notFoundMob2x from '@images/404-mob@2x.png';

function NotFound() {
  return (
    <div className={css.container}>
      <div className={css.contentWrapper}>
        <p className={css.codeContainer}>
          <span className={css.codeText}>4</span>
          <span className={css.imgContainer}>
            <picture>
              <source
                media="(min-width: 768px)"
                srcSet={`${notFoundDesk} 1x, ${notFoundDesk2x} 2x`}
                type="image/webp"
              />
              <source
                media="(max-width: 767px)"
                srcSet={`${notFoundMob} 1x, ${notFoundMob2x} 2x`}
                type="image/webp"
              />
              <img src={notFoundMob} alt="not found image" loading="lazy" />
            </picture>
          </span>
          <span className={css.codeText}>4</span>
        </p>
        <p className={css.text}>{`Ooops! This page not found :(`}</p>
        <Link to={'/home'} className={css.link}>
          To home page
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
