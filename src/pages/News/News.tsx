import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import css from './News.module.css';
import { useGetNewsQuery } from '@utils/api';
import NewsList from '@components/NewsList/NewsList';
import Title from '@components/Title/Title';
import SearchField from '@components/SearchField/SearchField';
import Pagination from '@components/Pagination/Pagination';

type SearchParams = {
  page?: string;
  keyword?: string;
};

function News() {
  const [searchParams, setSearchParams] = useSearchParams();
  const params: SearchParams = Object.fromEntries([...searchParams]);

  const [page, setPage] = useState((params.page && Number(params.page)) || 1);
  const [keyword, setKeyword] = useState(params.keyword || '');
  const [search, setSearch] = useState(params.keyword || '');

  const { data } = useGetNewsQuery({ page, ...(keyword && { keyword }) });

  const onChangePagination = (p: number): void => {
    setPage(p);
    setSearchParams({
      ...(p > 1 && { page: String(p) }),
      ...(keyword && { keyword }),
    });
  };

  const onChangeKeyword = (k: string): void => {
    setPage(1);
    setKeyword(k);
    setSearchParams({
      ...(k && { keyword: k }),
    });
  };

  const handleReset = (): void => {
    setSearch('');
    onChangeKeyword('');
  };

  const handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault();

    onChangeKeyword(search.trim());
  };

  const totalPages = data?.totalPages ?? 0;

  return (
    <>
      <div className={css.titleContainer}>
        <Title>News</Title>
        <form
          className={css.form}
          onSubmit={handleSubmit}
          onReset={handleReset}
        >
          <SearchField
            value={search}
            wrapClassName={css.search}
            onChange={setSearch}
            onReset={handleReset}
          />
        </form>
      </div>
      {data?.results && <NewsList list={data.results} />}
      {totalPages > 1 && (
        <Pagination
          page={page}
          totalPages={totalPages}
          onChange={onChangePagination}
        />
      )}
    </>
  );
}

export default News;
