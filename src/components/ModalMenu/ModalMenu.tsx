import Nav from '@components/Nav/Nav';
import ModalCloseBtn from '@components/ModalCloseBtn/ModalCloseBtn';
import useHomePageLocation from '@hooks/useHomePageLocation';
import useMedia from '@hooks/useMedia';
import AuthNav from '@components/AuthNav/AuthNav';
import LogOutBtn from '@components/LogOutBtn/LogOutBtn';

import type useMediaType from '@types-all/useMediaType';

function ModalMenu() {
  const { isMobile }: useMediaType = useMedia();
  const isHomePage: boolean = useHomePageLocation();

  const isLogged = true;

  return (
    <>
      <ModalCloseBtn
        size={isMobile ? 32 : 36}
        iconSize={isMobile ? 16 : 18}
        top={isMobile ? 28 : 40}
        right={isMobile ? 20 : 32}
        isWhite={!isHomePage}
      />
      <Nav isMenu={true} />
      {!isLogged && <AuthNav isMenu={true} />}
      {isLogged && <LogOutBtn isMenu={true} />}
    </>
  );
}

export default ModalMenu;
