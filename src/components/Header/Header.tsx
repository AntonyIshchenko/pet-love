// import React from 'react';
// import Logo from '@components/Logo';
import css from './Header.module.css';
import Logo from '@components/Logo/Logo';

type Props = {};

function Header({}: Props) {
  return (
    <header>
      <Logo />
    </header>
  );
}

export default Header;
