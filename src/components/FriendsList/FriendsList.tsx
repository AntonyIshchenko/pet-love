import FriendsItem from '@components/FriendsItem/FriendsItem';
import FriendsItemType from '@types-all/friendsItemType';
import css from './FriendsList.module.css';

type Props = {
  data: FriendsItemType[];
};

function FriendsList({ data }: Props) {
  console.log(data);

  return (
    <ul className={css.list}>
      {data.map((item: FriendsItemType) => (
        <FriendsItem key={item._id} item={item} />
      ))}
    </ul>
  );
}

export default FriendsList;
