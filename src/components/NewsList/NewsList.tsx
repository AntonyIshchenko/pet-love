import NewsItem from '@components/NewsItem/NewsItem';
import css from './NewsList.module.css';
import type newsItemType from '@types-all/newsItemType';

type Props = {
  list: newsItemType[];
};

function NewsList({ list = [] }: Props) {
  return (
    <ul className={css.list}>
      {list.map((item) => (
        <NewsItem key={item._id} item={item} />
      ))}
    </ul>
  );
}

export default NewsList;
