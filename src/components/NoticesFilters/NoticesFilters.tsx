import { useId, useState } from 'react';
import css from './NoticesFilters.module.css';
import clsx from 'clsx';
import Icon from '@components/Icon/Icon';
import SearchField from '@components/SearchField/SearchField';
import { useSelector } from 'react-redux';
import { commonSelectors } from '@redux/common';
import { filtersChangedType } from '@types-all/filtersChangedType';

type FiltersState = {
  keyword: string;
  category: string;
  species: string;
  locationId: string;
  sorting: string;
};

type Props = {
  filtersState: FiltersState;
  onChangeFilters: (changes: filtersChangedType) => void;
};

type SortingItemProps = {
  label: string;
  value: string;
  filtersState: FiltersState;
  onChangeFilters: (changes: filtersChangedType) => void;
};

function NoticesFilters({ filtersState, onChangeFilters }: Props) {
  const speciesList = useSelector(commonSelectors.species);
  const categoriesList = useSelector(commonSelectors.categories);
  const citiesList = useSelector(commonSelectors.cities);

  const [search, setSearch] = useState(filtersState.keyword);

  return (
    <form className={css.form}>
      <div className={css.filters}>
        <SearchField
          value={search}
          wrapClassName={css.filtersSearch}
          onChange={setSearch}
          onReset={() => {
            setSearch('');
            onChangeFilters({ keyword: '' });
          }}
          onSubmit={(e) => {
            e.preventDefault();
            onChangeFilters({ keyword: search });
          }}
        />
        {/* <input type="select" name="category" placeholder="category" /> */}
        <select name="category" id="">
          <option value="">Show all</option>
          <option value="sell">sell</option>
          <option value="free">free</option>
          <option value="lost">lost</option>
          <option value="found">found</option>
        </select>
        <input type="select" name="species" placeholder="type" />
        <input type="select" name="locationId" placeholder="location" />
      </div>
      <div className={css.divider} />
      <div className={css.sorting}>
        <NoticesFilters_SortingItem
          label="popular"
          value="byPopularity-true"
          {...{ filtersState, onChangeFilters }}
        />
        <NoticesFilters_SortingItem
          label="unpopular"
          value="byPopularity-false"
          {...{ filtersState, onChangeFilters }}
        />
        <NoticesFilters_SortingItem
          label="cheap"
          value="byPrice-false"
          {...{ filtersState, onChangeFilters }}
        />
        <NoticesFilters_SortingItem
          label="expensive"
          value="byPrice-true"
          {...{ filtersState, onChangeFilters }}
        />
        <NoticesFilters_SortingItem
          label="earliest"
          value="byDate-false"
          {...{ filtersState, onChangeFilters }}
        />
        <NoticesFilters_SortingItem
          label="latest"
          value="byDate-true"
          {...{ filtersState, onChangeFilters }}
        />
      </div>
    </form>
  );
}

export default NoticesFilters;

function NoticesFilters_SortingItem({
  label,
  value,
  filtersState,
  onChangeFilters,
}: SortingItemProps) {
  const itemId = useId();

  return (
    <div
      className={clsx(css.sortingContainer, value === '' && 'visuallyHidden')}
    >
      <input
        className={clsx(css.sortingInput, 'visuallyHidden')}
        type="radio"
        id={itemId}
        name="sorting"
        value={value}
        checked={filtersState.sorting === value}
        onChange={(event) => onChangeFilters({ sorting: event.target.value })}
      />
      <label className={css.sortingLabel} htmlFor={itemId}>
        {label}
        <button
          type="button"
          className={css.sortingIcon}
          onClick={() => onChangeFilters({ sorting: '' })}
        >
          <Icon name="x" width={12} height={12} />
        </button>
      </label>
    </div>
  );
}
