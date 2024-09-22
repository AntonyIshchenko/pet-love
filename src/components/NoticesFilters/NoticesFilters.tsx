import { useState } from 'react';

import type { filtersChangedType } from '@types-all/filtersChangedType';
import type { FiltersStateType } from '@types-all/filtersStateType';

import css from './NoticesFilters.module.css';

import SearchField from '@components/SearchField/SearchField';

import NoticesFilters_SortingItem from '@components/NoticesFilters/NoticesFilters_SortingItem';
import NoticesFilters_SelectFilters from '@components/NoticesFilters/NoticesFilters_SelectFilters';
import NoticesFilters_LocationFilter from '@components/NoticesFilters/NoticesFilters_LocationFilter';

type Props = {
  filtersState: FiltersStateType;
  onChangeFilters: (changes: filtersChangedType) => void;
};

function NoticesFilters({ filtersState, onChangeFilters }: Props) {
  const [search, setSearch] = useState(filtersState.keyword);

  const handleSearchReset = () => {
    setSearch('');
    onChangeFilters({ keyword: '' });
  };

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onChangeFilters({ keyword: search });
  };

  return (
    <form className={css.form}>
      <div className={css.filters}>
        <SearchField
          value={search}
          wrapClassName={css.filtersSearch}
          onChange={setSearch}
          onReset={handleSearchReset}
          onSubmit={handleSearchSubmit}
        />
        <NoticesFilters_SelectFilters {...{ filtersState, onChangeFilters }} />
        <NoticesFilters_LocationFilter {...{ filtersState, onChangeFilters }} />
      </div>
      <div className={css.divider} />
      <div className={css.sorting}>
        <NoticesFilters_SortingItem
          label="popular"
          value="byPopularity-false"
          {...{ filtersState, onChangeFilters }}
        />
        <NoticesFilters_SortingItem
          label="unpopular"
          value="byPopularity-true"
          {...{ filtersState, onChangeFilters }}
        />
        <NoticesFilters_SortingItem
          label="cheap"
          value="byPrice-true"
          {...{ filtersState, onChangeFilters }}
        />
        <NoticesFilters_SortingItem
          label="expensive"
          value="byPrice-false"
          {...{ filtersState, onChangeFilters }}
        />
        <NoticesFilters_SortingItem
          label="earliest"
          value="byDate-true"
          {...{ filtersState, onChangeFilters }}
        />
        <NoticesFilters_SortingItem
          label="latest"
          value="byDate-false"
          {...{ filtersState, onChangeFilters }}
        />
      </div>
    </form>
  );
}

export default NoticesFilters;
