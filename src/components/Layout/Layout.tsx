import React from 'react';
import clsx from 'clsx';
import { useLocation } from 'react-router-dom';

import { useLocationType } from '../../types';
import css from './Layout.module.css';

type Props = {
  children: React.ReactNode;
};

function Layout({ children }: Props) {
  const location: useLocationType = useLocation();

  return (
    <main>
      <div
        className={clsx(
          css.container,
          location.pathname === '/' && css.mainPage,
          location.pathname === '/home' ? css.homePage : css.commonPage
        )}
      >
        {children}
      </div>
    </main>
  );
}

export default Layout;
