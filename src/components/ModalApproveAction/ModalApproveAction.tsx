import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

import css from './ModalApproveAction.module.css';

import { commonActions } from '@redux/common';
import ModalCloseBtn from '@components/ModalCloseBtn/ModalCloseBtn';

function ModalApproveAction() {
  const yesBtn = useRef<HTMLButtonElement>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (yesBtn.current) yesBtn.current.focus();
  }, []);

  return (
    <div className={css.container}>
      <ModalCloseBtn />
      <div className={css.imgContainer}></div>
      <p className={css.text}>Already leaving?</p>
      <div className={css.btnContainer}>
        <button
          ref={yesBtn}
          type="button"
          className={css.btn}
          onClick={() => dispatch(commonActions.closeModal())}
        >
          Yes
        </button>
        <button
          type="button"
          className={css.btn}
          onClick={() => dispatch(commonActions.closeModal())}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default ModalApproveAction;
