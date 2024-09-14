import { useState } from 'react';

import css from './SearchField.module.css';
import Icon from '@components/Icon/Icon';

type Props = {
  keyword: string;
  onChangeKeyword: (value: string) => void;
};

function SearchField({ keyword, onChangeKeyword }: Props) {
  const [value, setValue] = useState(keyword);
  const [isFilled, setIsFilled] = useState(!!keyword);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    onChangeKeyword(value.trim());
  };

  const handleReset = () => {
    setValue('');
    setIsFilled(false);
    onChangeKeyword('');
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const trimmed = inputValue.trim();

    setValue(inputValue);
    if ((trimmed && !isFilled) || (!trimmed && isFilled)) {
      setIsFilled(!isFilled);
    }
  };

  return (
    <form className={css.form} onSubmit={handleSubmit} onReset={handleReset}>
      <input
        className={css.input}
        name="search"
        type="text"
        placeholder="Search"
        onChange={handleChange}
        value={value}
      />
      {isFilled && (
        <button type="reset" className={css.resetBtn}>
          <Icon name="x" width={18} height={18} />
        </button>
      )}
      <button type="submit" className={css.submitBtn}>
        <Icon name="search" width={18} height={18} />
      </button>
    </form>
  );
}

export default SearchField;
