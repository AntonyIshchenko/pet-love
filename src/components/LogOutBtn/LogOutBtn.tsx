import clsx from 'clsx';
import { useDispatch } from 'react-redux';

import css from './LogOutBtn.module.css';

import { commonActions } from '@redux/common';
import ModalApproveAction from '@components/ModalApproveAction/ModalApproveAction';

type Props = {
  isMenu?: boolean;
};

function LogOutBtn({ isMenu = false }: Props) {
  const dispatch = useDispatch();

  return (
    <button
      type="button"
      className={clsx(css.btn, isMenu ? css.btnMenu : css.btnMain)}
      onClick={() => {
        dispatch(commonActions.closeModal());
        setTimeout(
          () =>
            dispatch(
              commonActions.openModal({
                content: <ModalApproveAction />,
              })
            ),
          50
        );
      }}
    >
      Log out
    </button>
  );
}

export default LogOutBtn;
