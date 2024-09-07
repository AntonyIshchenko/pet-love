import { NavLink } from 'react-router-dom';
import clsx from 'clsx';

import css from './AuthNav.module.css';
import useHomePageLocation from '@hooks/useHomePageLocation';
import useMedia from '@hooks/useMedia';
import useMediaType from '@types-all/useMediaType';

function AuthNav() {
  const { isMobile }: useMediaType = useMedia();
  const isHomePage: boolean = useHomePageLocation();

  return (
    <nav>
      <ul className={css.list}>
        <li>
          <NavLink
            className={clsx(
              css.link,
              isMobile && !isHomePage ? css.loginMobile : css.login
            )}
            to={'/login'}
          >
            Log In
          </NavLink>
        </li>
        <li>
          <NavLink className={clsx(css.link, css.register)} to={'/register'}>
            Registration
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default AuthNav;
