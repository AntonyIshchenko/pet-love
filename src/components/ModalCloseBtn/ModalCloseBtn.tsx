import { useDispatch } from 'react-redux';
import clsx from 'clsx';

import css from './ModalCloseBtn.module.css';

import { commonActions } from '@redux/common';
import Icon from '@components/Icon/Icon';

type Props = {
  size?: number;
  iconSize?: number;
  top?: number;
  right?: number;
  isWhite?: boolean;
};

function ModalCloseBtn({
  size = 24,
  iconSize = 12,
  top = 20,
  right = 20,
  isWhite = false,
}: Props) {
  const dispatch = useDispatch();

  const styles = {
    width: `${size}px`,
    height: `${size}px`,
    top: `${top}px`,
    right: `${right}px`,
  };

  return (
    <button
      type="button"
      style={styles}
      className={clsx(css.btn, isWhite ? css.whiteBtn : css.blackBtn)}
      onClick={() => dispatch(commonActions.closeModal())}
    >
      <Icon name="x" width={iconSize} height={iconSize} />
    </button>
  );
}

export default ModalCloseBtn;
