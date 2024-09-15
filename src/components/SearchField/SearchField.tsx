import { useState } from 'react';

import css from './SearchField.module.css';
import Icon from '@components/Icon/Icon';
import clsx from 'clsx';

type Props = {
  value: string;
  wrapClassName?: string;

  onReset?: () => void;
  onSubmit?: (e: React.FormEvent) => void;
  onChange?: (v: string) => void;
};

function SearchField({
  value,
  wrapClassName,
  onReset,
  onSubmit,
  onChange,
}: Props) {
  const [isFilled, setIsFilled] = useState(!!value);

  const handleSubmit = (event: React.FormEvent) => {
    if (onSubmit) onSubmit(event);
  };

  const handleReset = () => {
    setIsFilled(false);

    if (onReset) onReset();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const trimmed = inputValue.trim();

    if ((trimmed && !isFilled) || (!trimmed && isFilled)) {
      setIsFilled(!isFilled);
    }

    if (onChange) onChange(inputValue);
  };

  return (
    <div className={clsx(css.inputWrap, wrapClassName)}>
      <input
        className={css.input}
        name="search"
        type="text"
        placeholder="Search"
        onChange={handleChange}
        value={value}
      />
      {isFilled && (
        <button type="reset" className={css.resetBtn} onClick={handleReset}>
          <Icon name="x" width={12} height={12} />
        </button>
      )}
      <button type="submit" className={css.submitBtn} onClick={handleSubmit}>
        <Icon name="search" width={18} height={18} />
      </button>
    </div>
  );
}

export default SearchField;
