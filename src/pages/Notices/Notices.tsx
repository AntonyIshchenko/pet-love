import { useSearchParams } from 'react-router-dom';

import css from './Notices.module.css';
import { useGetNoticesQuery } from '@utils/api';
import Title from '@components/Title/Title';
import Pagination from '@components/Pagination/Pagination';
import { useState } from 'react';
import NoticesList from '@components/NoticesList/NoticesList';

type Props = {};

function Notices({}: Props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const params = Object.fromEntries([...searchParams]);

  const [page, setPage] = useState((params.page && Number(params.page)) || 1);
  const [keyword, setKeyword] = useState(params.keyword || '');

  const { data } = useGetNoticesQuery({ page, ...(keyword && { keyword }) });

  const onChangePagination = (p: number): void => {
    setPage(p);
    setSearchParams({
      ...(p > 1 && { page: String(p) }),
      // ...(keyword && { keyword }),
    });
  };

  console.log(data);

  const totalPages = data?.totalPages ?? 0;

  return (
    <>
      <Title>Find your favorite pet</Title>
      {data?.results && <NoticesList list={data.results} />}
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

export default Notices;
