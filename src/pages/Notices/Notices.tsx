import { useSearchParams } from 'react-router-dom';

import css from './Notices.module.css';
import { useGetNoticesQuery } from '@utils/api';
import Title from '@components/Title/Title';
import Pagination from '@components/Pagination/Pagination';
import { useMemo, useState } from 'react';
import NoticesList from '@components/NoticesList/NoticesList';
import NoticesFilters from '@components/NoticesFilters/NoticesFilters';
import sortingUtils from '@utils/filtersSorting';
import { filtersChangedType } from '@types-all/filtersChangedType';

type Props = {};

function Notices({}: Props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const params = Object.fromEntries([...searchParams]);

  const [page, setPage] = useState((params.page && Number(params.page)) || 1);
  const [keyword, setKeyword] = useState(params.keyword || '');

  const [category, setCategory] = useState(params.category || '');
  const [species, setSpecies] = useState(params.species || '');
  const [locationId, setLocationId] = useState(params.locationId || '');
  const [sorting, setSorting] = useState(
    sortingUtils.getSortingFromQuery(params)
  );

  const { data } = useGetNoticesQuery({ page, ...(keyword && { keyword }) });

  const onChangePagination = (p: number): void => {
    setPage(p);
    setSearchParams({
      ...(p > 1 && { page: String(p) }),
      // ...(keyword && { keyword }),
    });
  };

  const onChangeFilters = (changes: filtersChangedType): void => {
    const [key, value] = Object.entries(changes)[0];

    let newSerachParams = {
      ...(page > 1 && { page: String(page) }),
    };

    switch (key) {
      case 'category':
        setCategory(value);
        newSerachParams = {
          ...newSerachParams,
          ...(value && { category: value }),
          ...(species && { species }),
          ...(locationId && { locationId }),
          ...(sorting && sortingUtils.getQueryFromSorting(sorting)),
        };
        break;
      case 'species':
        setSpecies(value);
        newSerachParams = {
          ...newSerachParams,
          ...(category && { category }),
          ...(value && { species: value }),
          ...(locationId && { locationId }),
          ...(sorting && sortingUtils.getQueryFromSorting(sorting)),
        };
        break;
      case 'locationId':
        setLocationId(value);
        newSerachParams = {
          ...newSerachParams,
          ...(category && { category }),
          ...(species && { species }),
          ...(value && { locationId: value }),
          ...(sorting && sortingUtils.getQueryFromSorting(sorting)),
        };
        break;
      case 'sorting':
        setSorting(value);
        newSerachParams = {
          ...newSerachParams,
          ...(category && { category }),
          ...(species && { species }),
          ...(locationId && { locationId }),
          ...(value && sortingUtils.getQueryFromSorting(value)),
        };
        break;
      default:
        return;
    }

    setSearchParams(newSerachParams);
  };

  // console.log(data);
  const filtersState = useMemo(
    () => ({ category, species, locationId, sorting }),
    [category, species, locationId, sorting]
  );

  const totalPages = data?.totalPages ?? 0;

  return (
    <>
      <Title>Find your favorite pet</Title>
      <NoticesFilters {...{ filtersState, onChangeFilters }} />
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
