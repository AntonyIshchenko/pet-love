import clsx from 'clsx';

import css from './LogOutBtn.module.css';
import { useDispatch } from 'react-redux';

type Props = {
  isMenu?: boolean;
};

function LogOutBtn({ isMenu = false }: Props) {
  const dispatch = useDispatch();

  return (
    <button
      type="button"
      className={clsx(css.btn, isMenu ? css.btnMenu : css.btnMain)}
    >
      Log out
    </button>
  );
}

export default LogOutBtn;
