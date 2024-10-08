import { useDispatch } from 'react-redux';
import clsx from 'clsx';

import Nav from '@components/Nav/Nav';
import css from './Header.module.css';
import Logo from '@components/Logo/Logo';
import AuthNav from '@components/AuthNav/AuthNav';
import UserNav from '@components/UserNav/UserNav';
import Icon from '@components/Icon/Icon';
import useMediaType from '@types-all/useMediaType';
import useMedia from '@hooks/useMedia';
import useHomePageLocation from '@hooks/useHomePageLocation';
import ModalMenu from '@components/ModalMenu/ModalMenu';
import { commonActions } from '@redux/common';

function Header() {
  const dispatch = useDispatch();
  const { isMobile, isDesktop }: useMediaType = useMedia();
  const isHomePage: boolean = useHomePageLocation();

  const isLogged = true;

  const menuSize = isMobile ? 32 : 36;
  return (
    <header className={css.header}>
      <div
        className={clsx(
          css.container,
          css[`container${isHomePage ? 'Home' : 'Main'}`]
        )}
      >
        <Logo />
        {isDesktop && <Nav />}
        <div className={css.rightNav}>
          {!isLogged && <AuthNav />}
          {isLogged && <UserNav />}
          {!isDesktop && (
            <button
              type="button"
              className={clsx(
                css.menuBtn,
                css[`menuBtn${isHomePage ? 'White' : 'Black'}`]
              )}
              onClick={() =>
                dispatch(
                  commonActions.openModal({
                    content: <ModalMenu />,
                    classes: {
                      content: clsx(
                        css.modalContent,
                        isHomePage && css.modalContentHome
                      ),
                      overlay: css.modalOverlay,
                    },
                  })
                )
              }
            >
              <Icon name={'menu'} width={menuSize} height={menuSize} />
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
