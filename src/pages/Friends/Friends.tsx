import Title from '@components/Title/Title';
import css from './Friends.module.css';
import FriendList from '@components/FriendsList/FriendsList';
import { useGetFriendsQuery } from '@utils/api';

function Friends() {
  const { data = [], error, isLoading } = useGetFriendsQuery(undefined);

  return (
    <>
      <Title>Our friends</Title>
      {!isLoading && !error && <FriendList data={data} />}
    </>
  );
}

export default Friends;
