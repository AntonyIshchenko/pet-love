import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';

import css from './AuthNav.module.css';
import useHomePageLocation from '@hooks/useHomePageLocation';
import useMedia from '@hooks/useMedia';
import { commonActions } from '@redux/common';

import type useMediaType from '@types-all/useMediaType';

type Props = {
  isMenu?: boolean;
};

function AuthNav({ isMenu = false }: Props) {
  const dispatch = useDispatch();
  const { isMobile }: useMediaType = useMedia();
  const isHomePage: boolean = useHomePageLocation();

  const handleClick = useCallback(() => {
    if (isMenu) {
      dispatch(commonActions.closeModal());
    }
  }, [isMenu, dispatch]);

  return (
    <nav className={clsx(isMenu && css.menuList)}>
      <ul className={clsx(css.list, isMenu && css.menuList)}>
        <li>
          <NavLink
            className={clsx(
              css.link,
              isMobile && !isHomePage ? css.loginMobile : css.login,
              isMenu && !isHomePage && css.loginMobile,
              isMenu && css.menuLink
            )}
            to={'/login'}
            onClick={handleClick}
          >
            Log In
          </NavLink>
        </li>
        <li>
          <NavLink
            className={clsx(css.link, css.register)}
            to={'/register'}
            onClick={handleClick}
          >
            Registration
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default AuthNav;
