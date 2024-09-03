import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';

import { Icon } from 'components';
import { useLocationType } from '../../types';
import css from './Logo.module.css';

function Logo() {
  const location: useLocationType = useLocation();

  return (
    <Link
      to="/home"
      className={clsx(
        css.link,
        location.pathname === '/home' ? css.white : css.black
      )}
    >
      petl
      <span
        className={clsx(
          css.iconWrapper,
          location.pathname === '/home' ? css.iconWhite : css.iconYellow
        )}
      >
        <Icon name={'heart-solid'} width={18} height={16} />
      </span>
      ve
    </Link>
  );
}

export default Logo;
