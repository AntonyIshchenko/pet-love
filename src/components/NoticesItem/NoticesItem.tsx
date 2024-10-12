import Icon from '@components/Icon/Icon';
import css from './NoticesItem.module.css';
import noticesItemType from '@types-all/noticesItemType';
import { useDispatch } from 'react-redux';
import { commonActions } from '@redux/common';
import ModalAttention from '@components/ModalAttention/ModalAttention';

type Props = {
  item: noticesItemType;
};

type FeatureProps = {
  name: string;
  value: string;
};

function NoticesItem({ item }: Props) {
  const dispatch = useDispatch();

  const birthday =
    (item.birthday && item.birthday.split('-').reverse().join('.')) || '';

  const isLogged = false;

  return (
    <li className={css.listItem}>
      <div className={css.imgContainer}>
        <img src={item.imgURL} alt={`${item.name} image`} loading="lazy" />
      </div>
      <div className={css.heading}>
        <h3 className={css.header}>{item.title}</h3>
        <p className={css.pop}>
          <span className={css.popIcon}>
            <Icon name="star" width={16} height={16} />
          </span>
          <span className={css.popValue}>{item.popularity}</span>
        </p>
      </div>
      <div className={css.featuresContainer}>
        <NoticesItemFeature name="Name" value={item.name} />
        <NoticesItemFeature name="Birthday" value={birthday} />
        <NoticesItemFeature name="Sex" value={item.sex} />
        <NoticesItemFeature name="Species" value={item.species} />
        <NoticesItemFeature name="Category" value={item.category} />
      </div>
      <p className={css.comment}>{item.comment}</p>
      <div className={css.btnContainer}>
        <button
          className={css.learnBtn}
          type="button"
          onClick={
            isLogged
              ? () => {}
              : () =>
                  dispatch(
                    commonActions.openModal({ content: <ModalAttention /> })
                  )
          }
        >
          Learn more
        </button>
        <button
          className={css.favoriteBtn}
          type="button"
          onClick={
            isLogged
              ? () => {}
              : () =>
                  dispatch(
                    commonActions.openModal({ content: <ModalAttention /> })
                  )
          }
        >
          <Icon name="heart-contour" width={18} height={18} />
        </button>
      </div>
    </li>
  );
}

function NoticesItemFeature({ name, value }: FeatureProps) {
  return (
    <p className={css.feature}>
      <span className={css.featureName}>{name}</span>
      <span className={css.featureValue}>{value}</span>
    </p>
  );
}
export default NoticesItem;
