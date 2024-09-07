import clsx from 'clsx';
import css from './LogOutBtn.module.css';

type Props = {
  isMenu?: boolean;
};

function LogOutBtn({ isMenu = false }: Props) {
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
