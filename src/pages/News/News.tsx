import { useGetNewsQuery } from '@utils/api';
import css from './News.module.css';
import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import NewsList from '@components/NewsList/NewsList';
import Title from '@components/Title/Title';
import SearchField from '@components/SearchField/SearchField';

function News() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(
    (searchParams.get('page') && Number(searchParams.get('page'))) || 1
  );
  const [keyword, setKeyword] = useState(searchParams.get('keyword') || '');
  const { data } = useGetNewsQuery({ page, ...(keyword && { keyword }) });

  const handleClick = () => {
    setPage(page + 1);
    searchParams.set('page', page + 1 + '');
    // data.refetch({ page, ...(keyword && { keyword }) });
  };

  return (
    <>
      <div className={css.titleContainer}>
        <Title>News</Title>
        <SearchField {...{ setKeyword }} />
      </div>
      {data?.results && <NewsList list={data.results} />}
      <button onClick={handleClick}> new++</button>
    </>
  );
}

export default News;
