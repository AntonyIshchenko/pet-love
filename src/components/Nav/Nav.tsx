import { useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';

import css from './Nav.module.css';
import useMedia from '@hooks/useMedia';
import useHomePageLocation from '@hooks/useHomePageLocation';
import useMediaType from '@types-all/useMediaType';

type NavClassState = {
  isActive: boolean;
  isPending: boolean;
  isTransitioning: boolean;
};

type Callback = (state: NavClassState) => string;

function Nav() {
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

  return (
    <nav>
      <ul className={css.list} role="list">
        <li>
          <NavLink className={getLinkClass} to={'/news'}>
            News
          </NavLink>
        </li>
        <li>
          <NavLink className={getLinkClass} to={'/notices'}>
            Find pet
          </NavLink>
        </li>
        <li>
          <NavLink className={getLinkClass} to={'/friends'}>
            Our friends
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
