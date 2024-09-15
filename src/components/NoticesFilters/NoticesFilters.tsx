import { useId } from 'react';
import css from './NoticesFilters.module.css';
import clsx from 'clsx';
import Icon from '@components/Icon/Icon';
import SearchField from '@components/SearchField/SearchField';
import { useSelector } from 'react-redux';
import { commonSelectors } from '@redux/common';
import { filtersChangedType } from '@types-all/filtersChangedType';

type Props = {
  filtersState: {
    category: string;
    species: string;
    locationId: string;
    sorting: string;
  };
  onChangeFilters: (changes: filtersChangedType) => void;
};

type SortingItemProps = {
  label: string;
  value: string;
};

function NoticesFilters({ filtersState, onChangeFilters }: Props) {
  const speciesList = useSelector(commonSelectors.species);
  const categoriesList = useSelector(commonSelectors.categories);
  const citiesList = useSelector(commonSelectors.cities);

  return (
    <form className={css.form}>
      <div className={css.filters}>
        <SearchField value={'dog'} wrapClassName={css.filtersSearch} />
        {/* <input type="select" name="category" placeholder="category" /> */}
        <select name="category" id="">
          <option value="default">Show all</option>
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
        <NoticesFilters_SortingItem label="popular" value="byPopularity-1" />
        <NoticesFilters_SortingItem label="unpopular" value="byPopularity-0" />
        <NoticesFilters_SortingItem label="cheap" value="byPrice-0" />
        <NoticesFilters_SortingItem label="expensive" value="byPrice-1" />
        <NoticesFilters_SortingItem label="earliest" value="byDate-0" />
        <NoticesFilters_SortingItem label="latest" value="byDate-1" />
        <NoticesFilters_SortingItem label="default" value="" />
      </div>
    </form>
  );
}

export default NoticesFilters;

function NoticesFilters_SortingItem({ label, value }: SortingItemProps) {
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
      />
      <label className={css.sortingLabel} htmlFor={itemId}>
        {label}
        <span className={css.sortingIcon}>
          <Icon name="x" width={12} height={12} />
        </span>
      </label>
    </div>
  );
}
