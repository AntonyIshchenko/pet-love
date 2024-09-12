import { useState } from 'react';
import css from './SearchField.module.css';
import { log } from 'console';
import Icon from '@components/Icon/Icon';

type Props = {
  setKeyword: (value: string) => void;
};

function SearchField({ setKeyword }: Props) {
  const [isFilled, setIsFilled] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const value = event.target.elements.search.value.trim();
    setKeyword(value);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.trim();
    if ((value && !isFilled) || (!value && isFilled)) {
      setIsFilled(!isFilled);
    }
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <input
        className={css.input}
        name="search"
        type="text"
        placeholder="Search"
        onChange={handleChange}
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
