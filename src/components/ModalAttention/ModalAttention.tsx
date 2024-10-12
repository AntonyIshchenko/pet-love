import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { commonActions } from '@redux/common';
import { Link } from 'react-router-dom';

import css from './ModalAttention.module.css';

import ModalCloseBtn from '@components/ModalCloseBtn/ModalCloseBtn';

function ModalAttention() {
  const loginBtn = useRef<HTMLAnchorElement>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (loginBtn.current) loginBtn.current.focus();
  }, []);

  const handleClick = () => dispatch(commonActions.closeModal());

  return (
    <div className={css.container}>
      <ModalCloseBtn />
      <div className={css.imgContainer}></div>
      <p className={css.heading}>Attention</p>
      <p className={css.text}>
        We would like to remind you that certain functionality is available only
        to authorized users.If you have an account, please log in with your
        credentials. If you do not already have an account, you must register to
        access these features.
      </p>
      <div className={css.linkContainer}>
        <Link
          className={css.link}
          to="/login"
          ref={loginBtn}
          onClick={handleClick}
        >
          Log In
        </Link>
        <Link className={css.link} to="/register" onClick={handleClick}>
          Registration
        </Link>
      </div>
    </div>
  );
}

export default ModalAttention;
