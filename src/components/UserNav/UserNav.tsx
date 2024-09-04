import { NavLink } from 'react-router-dom';
import css from './UserNav.module.css';

type Props = {};

function UserNav({}: Props) {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to={'/news'}>News</NavLink>
        </li>
        <li>
          <NavLink to={'/notices'}>Find pet</NavLink>
        </li>
        <li>
          <NavLink to={'/friends'}>Our friends</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default UserNav;
