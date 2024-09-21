import { useId, useMemo, useState } from 'react';
import css from './NoticesFilters.module.css';
import clsx from 'clsx';
import Icon from '@components/Icon/Icon';
import SearchField from '@components/SearchField/SearchField';
import { useSelector } from 'react-redux';
import { commonSelectors } from '@redux/common';
import { filtersChangedType } from '@types-all/filtersChangedType';
import Select, {
  SingleValue,
  MultiValue,
  ClassNamesConfig,
  SingleValueProps,
  OptionProps,
  DropdownIndicatorProps,
  components,
  ClearIndicatorProps,
} from 'react-select';
import { useDebouncedCallback } from 'use-debounce';

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

type OptionsType = {
  value: string;
  label: string;
};

const selectClassNames: ClassNamesConfig<OptionsType> = {
  container: () => css.selectContainer,
  control: () => css.selectControl,
  valueContainer: () => css.selectValueContainer,
  singleValue: (state: SingleValueProps<OptionsType>) =>
    `${css.singleValue} ${!state.data.value && css.singleValuePlaceholder}`,
  dropdownIndicator: () => css.dropdownIndicator,
  menu: () => css.menu,
  menuList: () => css.menuList,
  option: (state: OptionProps<OptionsType>) =>
    `${css.option} ${state.isSelected ? css.optionSelected : ''}`,
};

const inputClassNames: ClassNamesConfig<OptionsType> = {
  container: () => css.inputContainer,
  control: () => css.selectControl,
  valueContainer: () => css.selectValueContainer,
  placeholder: () => `${css.singleValue} ${css.singleValuePlaceholder}`,
  singleValue: () => css.singleValue,
  input: () => css.inputInput,
  clearIndicator: () => css.clearIndicator,
  menu: () => css.menu,
  menuList: () => css.menuList,
  option: (state: OptionProps<OptionsType>) =>
    `${css.option} ${state.isSelected ? css.optionSelected : ''}`,
};

const DropdownIndicator = (props: DropdownIndicatorProps<OptionsType>) => {
  return (
    <components.DropdownIndicator {...props}>
      <Icon name="chevron-down" width={14} height={10} />
    </components.DropdownIndicator>
  );
};

const SingleValueCategories = (props: SingleValueProps<OptionsType>) => {
  return (
    <components.SingleValue {...props}>
      {props.data.value === '' ? 'category' : props.children}
    </components.SingleValue>
  );
};

const SingleValueSpecies = (props: SingleValueProps<OptionsType>) => {
  return (
    <components.SingleValue {...props}>
      {props.data.value === '' ? 'type' : props.children}
    </components.SingleValue>
  );
};

const SingleValueLocations = (props: SingleValueProps<OptionsType>) => {
  return (
    <components.SingleValue {...props}>
      {props.data.value ? props.children : 'location'}
    </components.SingleValue>
  );
};

const ClearIndicator = (props: ClearIndicatorProps<OptionsType>) => {
  return (
    <components.ClearIndicator {...props}>
      <Icon name="x" width={12} height={12} />
    </components.ClearIndicator>
  );
};

function NoticesFilters({ filtersState, onChangeFilters }: Props) {
  const speciesList = useSelector(commonSelectors.species);
  const categoriesList = useSelector(commonSelectors.categories);
  const citiesList = useSelector(commonSelectors.cities);

  const [search, setSearch] = useState(filtersState.keyword);

  const [location, setLocation] = useState(() => {
    const city = filtersState.locationId
      ? citiesList.find((item) => item.id === filtersState.locationId)
      : null;

    return city ? { value: city.id, label: city.name } : null;
  });
  const [searchCity, setSearchCity] = useState(location?.label || '');

  const debounced = useDebouncedCallback((value) => setSearchCity(value), 750);

  const categoriesOptions: OptionsType[] = useMemo(() => {
    return [
      { value: '', label: 'Show all' },
      ...categoriesList.map((item) => ({ value: item, label: item })),
    ];
  }, [categoriesList]);

  const speciesOptions: OptionsType[] = useMemo(() => {
    return [
      { value: '', label: 'Show all' },
      ...speciesList.map((item) => ({ value: item, label: item })),
    ];
  }, [speciesList]);

  const citiesOptions: OptionsType[] = useMemo(() => {
    if (searchCity.trim().length < 3) return [];

    return [
      ...citiesList
        .filter((item) =>
          item.name.toLowerCase().includes(searchCity.toLowerCase())
        )
        .map((item) => ({ value: item.id, label: item.name })),
    ];
  }, [searchCity, citiesList]);

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
        <Select
          defaultValue={categoriesOptions[0]}
          components={{
            SingleValue: SingleValueCategories,
            DropdownIndicator,
            IndicatorSeparator: null,
          }}
          onChange={(
            selected: SingleValue<OptionsType> | MultiValue<OptionsType>
          ) => {
            if (isSingleValue(selected))
              onChangeFilters({ category: selected?.value || '' });
            else onChangeFilters({ category: '' });
          }}
          classNames={selectClassNames}
          options={categoriesOptions}
          isSearchable={false}
          isMulti={false}
        />

        <Select
          defaultValue={speciesOptions[0]}
          components={{
            SingleValue: SingleValueSpecies,
            DropdownIndicator,
            IndicatorSeparator: null,
          }}
          onChange={(
            selected: SingleValue<OptionsType> | MultiValue<OptionsType>
          ) => {
            if (isSingleValue(selected))
              onChangeFilters({ species: selected?.value || '' });
            else onChangeFilters({ species: '' });
          }}
          classNames={selectClassNames}
          options={speciesOptions}
          isSearchable={false}
          isMulti={false}
        />

        <Select
          defaultValue={location}
          components={{
            SingleValue: SingleValueLocations,
            IndicatorSeparator: null,
            DropdownIndicator: null,
            ClearIndicator,
          }}
          onInputChange={(text) => {
            debounced(text);
          }}
          onChange={(
            selected: SingleValue<OptionsType> | MultiValue<OptionsType>
          ) => {
            if (isSingleValue(selected)) {
              onChangeFilters({ locationId: selected?.value || '' });
              setLocation(selected);
            } else if (selected === null) {
              onChangeFilters({ locationId: '' });
              setLocation(null);
            }
          }}
          classNames={inputClassNames}
          placeholder={'location'}
          options={citiesOptions}
          isMulti={false}
          isSearchable={true}
          isClearable
        />
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

function isSingleValue<T>(
  value: SingleValue<T> | MultiValue<T>
): value is SingleValue<T> {
  return value !== null && typeof value === 'object' && 'value' in value;
}
