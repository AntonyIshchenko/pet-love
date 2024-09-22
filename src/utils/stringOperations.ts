function capitalize(value: string) {
  if (!value.length) return value;

  return value.slice(0, 1).toUpperCase() + value.slice(1);
}

function splitBySearch(value: string, search: string) {
  if (!search) return [value];

  const regex = new RegExp(`(${search})`, 'gi');

  return value.split(regex);
}

export default {
  capitalize,
  splitBySearch,
};
