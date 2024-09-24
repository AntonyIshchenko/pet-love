import { useEffect, useMemo, useRef, useState } from 'react';
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
import { commonActions, commonSelectors } from '@redux/common';
import stringOperations from '@utils/stringOperations';
import { useDispatch } from 'react-redux';
import { getState } from '@redux/store';

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
    `${css.option} ${state.isSelected ? css.optionSelected : ''} ${
      state.isFocused ? css.optionFocused : ''
    }`,
  noOptionsMessage: () => css.noOption,
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
      <button type="button" className={css.clearIndicatorBtn}>
        <Icon name="x" width={12} height={12} />
      </button>
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
  const dispatch = useDispatch();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const citiesList = useSelector(commonSelectors.filteredCities);
  const isCitiesFetched = useSelector(commonSelectors.isCitiesFetched);

  const [location, setLocation] = useState<SelectOptionType | null>(() => {
    const city = getState().common.cities.find(
      (item) => item.id === filtersState.locationId
    );

    return city ? { value: city.id, label: city.name } : null;
  });

  const [inputText, setInputText] = useState(location?.label || '');

  const citiesOptions: SelectOptionType[] = useMemo(
    () => [
      ...citiesList.map((item) => ({
        value: item.id,
        label: item.name,
      })),
    ],
    [citiesList]
  );

  const debounced = useDebouncedCallback(
    (value) => dispatch(commonActions.setCityFilter(value)),
    500
  );

  const debouncedInput = useDebouncedCallback(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, 100);

  useEffect(() => {
    if (!isCitiesFetched || !filtersState.locationId) return;

    const city = getState().common.cities.find(
      (item) => item.id === filtersState.locationId
    );

    if (city) {
      setInputText(city.name);
      dispatch(commonActions.setCityFilter(city.name));
      setLocation({ value: city.id, label: city.name });
    }
  }, [isCitiesFetched, filtersState.locationId, dispatch]);

  useEffect(() => {
    const inputElem = document.querySelector(
      '#filter-location-input'
    ) as HTMLInputElement | null;

    if (inputElem) inputRef.current = inputElem;
  }, []);

  const handleInputChange = (text: string) => {
    setInputText(text);

    debounced(text);
  };

  const handleChange = (
    selected: SingleValue<SelectOptionType> | MultiValue<SelectOptionType>
  ) => {
    if (isSingleValue(selected)) {
      setInputText(selected?.label || '');
      dispatch(commonActions.setCityFilter(selected?.label || ''));
      setLocation(selected);
      onChangeFilters({ locationId: selected?.value || '' });

      debouncedInput();
    } else {
      setInputText('');
      dispatch(commonActions.setCityFilter(''));
      setLocation(null);
      onChangeFilters({ locationId: '' });
    }
  };

  return (
    <>
      <Select
        value={location}
        inputId="filter-location-input"
        inputValue={inputText || location?.label || ''}
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
        blurInputOnSelect={true}
        isClearable
        noOptionsMessage={() => `No options (please type min 3 symbols)`}
      />
    </>
  );
}

export default NoticesFilters_LocationFilter;
