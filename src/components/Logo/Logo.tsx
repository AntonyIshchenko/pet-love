import { Link } from 'react-router-dom';
import clsx from 'clsx';

import Icon from '@components/Icon/Icon';
import css from './Logo.module.css';
import useHomePageLocation from '@hooks/useHomePageLocation';

function Logo() {
  const isHomePage: boolean = useHomePageLocation();

  return (
    <Link
      to="/home"
      className={clsx(css.link, isHomePage ? css.white : css.black)}
    >
      petl
      <span
        className={clsx(
          css.iconWrapper,
          isHomePage ? css.iconWhite : css.iconYellow
        )}
      >
        <Icon name={'heart-solid'} width={18} height={16} />
      </span>
      ve
    </Link>
  );
}

export default Logo;
