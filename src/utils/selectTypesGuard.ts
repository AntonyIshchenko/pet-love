import { SingleValue, MultiValue } from 'react-select';

export function isSingleValue<T>(
  value: SingleValue<T> | MultiValue<T>
): value is SingleValue<T> {
  return value !== null && typeof value === 'object' && 'value' in value;
}
