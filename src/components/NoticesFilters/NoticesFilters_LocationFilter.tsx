import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import Select, {
  SingleValue,
  MultiValue,
  ClassNamesConfig,
  SingleValueProps,
  OptionProps,
  components,
  ClearIndicatorProps,
} from 'react-select';
import { useDebouncedCallback } from 'use-debounce';

import type { SelectOptionType } from '@types-all/selectOptionType';
import type { filtersChangedType } from '@types-all/filtersChangedType';
import type { FiltersStateType } from '@types-all/filtersStateType';

import css from './NoticesFilters.module.css';
import Icon from '@components/Icon/Icon';
import { isSingleValue } from '@utils/selectTypesGuard';
import { commonSelectors } from '@redux/common';
import stringOperations from '@utils/stringOperations';

type Props = {
  filtersState: FiltersStateType;
  onChangeFilters: (changes: filtersChangedType) => void;
};

const inputClassNames: ClassNamesConfig<SelectOptionType> = {
  container: () => css.inputContainer,
  control: () => css.selectControl,
  valueContainer: () => css.selectValueContainer,
  placeholder: () => `${css.singleValue} ${css.singleValuePlaceholder}`,
  singleValue: () => css.singleValue,
  input: () => css.inputInput,
  clearIndicator: () => css.clearIndicator,
  menu: () => css.menu,
  menuList: () => css.menuList,
  option: (state: OptionProps<SelectOptionType>) =>
    `${css.option} ${state.isSelected ? css.optionSelected : ''}`,
};

const SingleValueLocations = (props: SingleValueProps<SelectOptionType>) => {
  return (
    <components.SingleValue {...props}>
      {props.data.value ? props.children : 'Location'}
    </components.SingleValue>
  );
};

const ClearIndicator = (props: ClearIndicatorProps<SelectOptionType>) => {
  return (
    <components.ClearIndicator {...props}>
      <Icon name="x" width={12} height={12} />
    </components.ClearIndicator>
  );
};

const OptionLocation = (props: OptionProps<SelectOptionType>) => {
  const { data, selectProps } = props;
  const { inputValue } = selectProps;

  const parts = stringOperations.splitBySearch(data.label, inputValue);

  return (
    <components.Option {...props}>
      {parts.map((part, index) =>
        part.toLowerCase() === inputValue.toLowerCase() ? (
          <span key={index} className={css.optionMatched}>
            {part}
          </span>
        ) : (
          part
        )
      )}
    </components.Option>
  );
};

function NoticesFilters_LocationFilter({
  filtersState,
  onChangeFilters,
}: Props) {
  const citiesList = useSelector(commonSelectors.cities);

  const [location, setLocation] = useState<SelectOptionType | null>(null);
  const [inputText, setInputText] = useState(location?.label || '');
  const [search, setSearch] = useState(location?.label || '');

  const citiesOptions: SelectOptionType[] = useMemo(
    () =>
      search.trim().length < 3
        ? []
        : [
            ...citiesList
              .filter((item) =>
                item.name.toLowerCase().includes(search.toLowerCase())
              )
              .map((item) => ({
                value: item.id,
                label: item.name,
              })),
          ],
    [search, citiesList]
  );

  const debounced = useDebouncedCallback((value) => setSearch(value), 500);

  useEffect(() => {
    if (!citiesList.length || !filtersState.locationId) return;

    const city = citiesList.find((item) => item.id === filtersState.locationId);
    if (city) {
      setInputText(city.name);
      setSearch(city.name);
      setLocation({ value: city.id, label: city.name });
    } else {
      setInputText('');
      setSearch('');
      setLocation(null);
    }
  }, [citiesList, filtersState.locationId]);

  const handleInputChange = (text: string) => {
    setInputText(text);
    debounced(text);
  };

  const handleChange = (
    selected: SingleValue<SelectOptionType> | MultiValue<SelectOptionType>
  ) => {
    if (isSingleValue(selected)) {
      setInputText(selected?.label || '');
      setSearch(selected?.label || '');
      setLocation(selected);
      onChangeFilters({ locationId: selected?.value || '' });
    } else {
      setInputText('');
      setSearch('');
      setLocation(null);
      onChangeFilters({ locationId: '' });
    }
  };

  return (
    <>
      <Select
        value={location}
        inputValue={inputText}
        components={{
          ClearIndicator,
          Option: OptionLocation,
          SingleValue: SingleValueLocations,
          IndicatorSeparator: null,
          DropdownIndicator: null,
        }}
        onInputChange={handleInputChange}
        onChange={handleChange}
        classNames={inputClassNames}
        placeholder={'Location'}
        options={citiesOptions}
        isMulti={false}
        isSearchable={true}
        filterOption={null}
        isClearable
      />
    </>
  );
}

export default NoticesFilters_LocationFilter;
