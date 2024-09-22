import { useId } from 'react';
import clsx from 'clsx';

import Icon from '@components/Icon/Icon';
import css from './NoticesFilters.module.css';
import type { filtersChangedType } from '@types-all/filtersChangedType';
import type { FiltersStateType } from '@types-all/filtersStateType';

type SortingItemProps = {
  label: string;
  value: string;
  filtersState: FiltersStateType;
  onChangeFilters: (changes: filtersChangedType) => void;
};

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

export default NoticesFilters_SortingItem;
