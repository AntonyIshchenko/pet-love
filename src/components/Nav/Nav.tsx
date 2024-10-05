import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';

import css from './Nav.module.css';
import useMedia from '@hooks/useMedia';
import useHomePageLocation from '@hooks/useHomePageLocation';
import useMediaType from '@types-all/useMediaType';
import { commonActions } from '@redux/common';

type NavClassState = {
  isActive: boolean;
  isPending: boolean;
  isTransitioning: boolean;
};

type Props = {
  isMenu?: boolean;
};

type Callback = (state: NavClassState) => string;

function Nav({ isMenu = false }: Props) {
  const dispatch = useDispatch();
  const { isDesktop }: useMediaType = useMedia();
  const isHomePage: boolean = useHomePageLocation();

  const getLinkClass = useCallback<Callback>(
    (state) => {
      const suffix = state.isActive ? 'Active' : 'InActive';
      const color = isDesktop === isHomePage ? 'White' : 'Black';
      return clsx(css.link, css[`link${color}${suffix}`]);
    },
    [isDesktop, isHomePage]
  );

  const handleClick = useCallback(() => {
    if (isMenu) {
      dispatch(commonActions.closeModal());
    }
  }, [isMenu, dispatch]);

  return (
    <nav>
      <ul className={css.list}>
        <li>
          <NavLink className={getLinkClass} to={'/news'} onClick={handleClick}>
            News
          </NavLink>
        </li>
        <li>
          <NavLink
            className={getLinkClass}
            to={'/notices'}
            onClick={handleClick}
          >
            Find pet
          </NavLink>
        </li>
        <li>
          <NavLink
            className={getLinkClass}
            to={'/friends'}
            onClick={handleClick}
          >
            Our friends
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
