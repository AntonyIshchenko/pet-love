// import React from 'react';
// import Logo from '@components/Logo';
import Nav from '@components/Nav/Nav';
import css from './Header.module.css';
import Logo from '@components/Logo/Logo';

type Props = {};

function Header({}: Props) {
  return (
    <header>
      <Logo />
      <Nav />
    </header>
  );
}

export default Header;
