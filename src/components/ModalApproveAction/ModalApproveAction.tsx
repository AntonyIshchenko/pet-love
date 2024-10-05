import ModalCloseBtn from '@components/ModalCloseBtn/ModalCloseBtn';
import css from './ModalApproveAction.module.css';
import catImg from '@images/cat-icon.png';

type Props = {};

function ModalApproveAction({}: Props) {
  return (
    <>
      <ModalCloseBtn />
      <div className={css.imgContainer}></div>
      <p className={css.text}>Already leaving?</p>
      <div className={css.btnContainer}>
        <button className={css.yesBtn}>Yes</button>
        <button className={css.cancelBtn}>Cancel</button>
      </div>
    </>
  );
}

export default ModalApproveAction;
