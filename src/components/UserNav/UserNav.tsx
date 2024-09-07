import css from './UserNav.module.css';
import UserBar from '@components/UserBar/UserBar';
import LogOutBtn from '@components/LogOutBtn/LogOutBtn';
import useMediaType from '@types-all/useMediaType';
import useMedia from '@hooks/useMedia';
import useHomePageLocation from '@hooks/useHomePageLocation';

type Props = {
  isMenu?: boolean;
};

function UserNav({ isMenu = false }: Props) {
  const { isDesktop }: useMediaType = useMedia();
  const isHomePage: boolean = useHomePageLocation();

  return (
    <nav>
      <ul className={css.list}>
        {((isDesktop && !isHomePage) || isMenu) && (
          <li>
            <LogOutBtn />
          </li>
        )}
        {!isMenu && (
          <li>
            <UserBar />
          </li>
        )}
      </ul>
    </nav>
  );
}

export default UserNav;
