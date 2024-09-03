import { Logo } from 'components';
import css from './Header.module.css';

type Props = {};

function Header({}: Props) {
  return (
    <header>
      <Logo />
    </header>
  );
}

export default Header;
