import css from './NoticesList.module.css';
import NoticesItem from '@components/NoticesItem/NoticesItem';
import noticesItemType from '@types-all/noticesItemType';

type Props = {
  list: noticesItemType[];
};

function NoticesList({ list = [] }: Props) {
  return (
    <ul className={css.list}>
      {list.map((item) => (
        <NoticesItem key={item._id} item={item} />
      ))}
    </ul>
  );
}

export default NoticesList;
