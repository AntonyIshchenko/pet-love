import { Link } from 'react-router-dom';

import css from './UserBar.module.css';
import Icon from '@components/Icon/Icon';
import useMedia from '@hooks/useMedia';
import useMediaType from '@types-all/useMediaType';
import useHomePageLocation from '@hooks/useHomePageLocation';

function UserBar() {
  const { isMobile }: useMediaType = useMedia();
  const isHomePage: boolean = useHomePageLocation();

  const iconSize = isMobile ? 20 : 24;

  return (
    <Link to={'/profile'} className={css.link}>
      <span className={css.icon}>
        <Icon name={'user-medium'} width={iconSize} height={iconSize} />
      </span>
      {!isMobile && (
        <span className={isHomePage ? css.white : css.black}>Username</span>
      )}
    </Link>
  );
}

export default UserBar;
