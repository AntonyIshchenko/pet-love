import { useEffect, useMemo, useState } from 'react';
import Select, {
  components,
  SingleValue,
  MultiValue,
  ClassNamesConfig,
  SingleValueProps,
  OptionProps,
  DropdownIndicatorProps,
} from 'react-select';
import { useSelector } from 'react-redux';

import type { SelectOptionType } from '@types-all/selectOptionType';
import type { filtersChangedType } from '@types-all/filtersChangedType';
import type { FiltersStateType } from '@types-all/filtersStateType';

import css from './NoticesFilters.module.css';
import { commonSelectors } from '@redux/common';
import Icon from '@components/Icon/Icon';
import stringOperations from '@utils/stringOperations';
import { isSingleValue } from '@utils/selectTypesGuard';

type Props = {
  filtersState: FiltersStateType;
  onChangeFilters: (changes: filtersChangedType) => void;
};

const defaultValue: { value: string; label: string } = {
  value: '',
  label: 'Show all',
};

const DropdownIndicator = (props: DropdownIndicatorProps<SelectOptionType>) => {
  return (
    <components.DropdownIndicator {...props}>
      <Icon name="chevron-down" width={14} height={10} />
    </components.DropdownIndicator>
  );
};

const SingleValueCategories = (props: SingleValueProps<SelectOptionType>) => {
  return (
    <components.SingleValue {...props}>
      {props.data.value === '' ? 'Category' : props.children}
    </components.SingleValue>
  );
};

const SingleValueSpecies = (props: SingleValueProps<SelectOptionType>) => {
  return (
    <components.SingleValue {...props}>
      {props.data.value === '' ? 'Type' : props.children}
    </components.SingleValue>
  );
};

const selectClassNames: ClassNamesConfig<SelectOptionType> = {
  container: () => css.selectContainer,
  control: () => css.selectControl,
  valueContainer: () => css.selectValueContainer,
  singleValue: (state: SingleValueProps<SelectOptionType>) =>
    `${css.singleValue} ${!state.data.value && css.singleValuePlaceholder}`,
  dropdownIndicator: () => css.dropdownIndicator,
  menu: () => css.menu,
  menuList: () => css.menuList,
  option: (state: OptionProps<SelectOptionType>) =>
    `${css.option} ${state.isSelected ? css.optionSelected : ''}`,
};

function NoticesFilters_SelectFilters({
  filtersState,
  onChangeFilters,
}: Props) {
  const [category, setCategory] = useState<SelectOptionType>(defaultValue);
  const [species, setSpecies] = useState<SelectOptionType>(defaultValue);

  const speciesList = useSelector(commonSelectors.species);
  const categoriesList = useSelector(commonSelectors.categories);

  const categoriesOptions: SelectOptionType[] = useMemo(() => {
    return [
      defaultValue,
      ...categoriesList.map((item) => ({
        value: item,
        label: stringOperations.capitalize(item),
      })),
    ];
  }, [categoriesList]);

  const speciesOptions: SelectOptionType[] = useMemo(() => {
    return [
      defaultValue,
      ...speciesList.map((item) => ({
        value: item,
        label: stringOperations.capitalize(item),
      })),
    ];
  }, [speciesList]);

  useEffect(() => {
    const selectedOption = categoriesOptions.find(
      (item) => item.value === filtersState.category
    );
    setCategory(
      selectedOption
        ? {
            value: selectedOption?.value || '',
            label: selectedOption?.label || 'Show All',
          }
        : defaultValue
    );
  }, [filtersState.category, categoriesOptions]);

  useEffect(() => {
    const selectedOption = speciesOptions.find(
      (item) => item.value === filtersState.species
    );
    setSpecies(
      selectedOption
        ? {
            value: selectedOption?.value || '',
            label: selectedOption?.label || 'Show All',
          }
        : defaultValue
    );
  }, [filtersState.species, speciesOptions]);

  const handleCategoryChange = (
    selected: SingleValue<SelectOptionType> | MultiValue<SelectOptionType>
  ) => {
    if (isSingleValue(selected)) {
      setCategory({
        value: selected?.value || '',
        label: selected?.label || 'Show all',
      });
      onChangeFilters({ category: selected?.value || '' });
    } else {
      setCategory(defaultValue);
      onChangeFilters({ category: '' });
    }
  };

  const handleSpeciesChange = (
    selected: SingleValue<SelectOptionType> | MultiValue<SelectOptionType>
  ) => {
    if (isSingleValue(selected)) {
      setSpecies({
        value: selected?.value || '',
        label: selected?.label || 'Show all',
      });
      onChangeFilters({ species: selected?.value || '' });
    } else {
      setSpecies(defaultValue);
      onChangeFilters({ species: '' });
    }
  };

  return (
    <>
      <Select
        value={category}
        components={{
          SingleValue: SingleValueCategories,
          DropdownIndicator,
          IndicatorSeparator: null,
        }}
        onChange={handleCategoryChange}
        classNames={selectClassNames}
        options={categoriesOptions}
        isSearchable={false}
        isMulti={false}
      />

      <Select
        value={species}
        components={{
          SingleValue: SingleValueSpecies,
          DropdownIndicator,
          IndicatorSeparator: null,
        }}
        onChange={handleSpeciesChange}
        classNames={selectClassNames}
        options={speciesOptions}
        isSearchable={false}
        isMulti={false}
      />
    </>
  );
}

export default NoticesFilters_SelectFilters;
