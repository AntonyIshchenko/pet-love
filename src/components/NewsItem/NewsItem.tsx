import css from './NewsItem.module.css';
import type newsItemType from '@types-all/newsItemType';

type Props = {
  item: newsItemType;
};

function NewsItem({ item }: Props) {
  const dateFormatted = new Date(item.date).toLocaleDateString('en-GB');

  return (
    <li className={css.listItem}>
      <div className={css.imgContainer}>
        <img src={item.imgUrl} alt={item.title} loading="lazy" />
      </div>
      <h3 className={css.title}>{item.title}</h3>
      <p className={css.text}>{item.text}</p>
      <div className={css.dateContainer}>
        <p className={css.date}>{dateFormatted}</p>
        <a className={css.link} href={item.url} target="_blank">
          Read more
        </a>
      </div>
    </li>
  );
}

export default NewsItem;
