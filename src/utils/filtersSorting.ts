type NoticesSearchParamsObj = {
  byDate?: string;
  byPrice?: string;
  byPopularity?: string;
};

function getSortingFromQuery(params: NoticesSearchParamsObj): string {
  let name, value;
  if (params.byDate) {
    name = 'byDate';
    value = params.byDate.toLowerCase();
  } else if (params.byPrice) {
    name = 'byPrice';
    value = params.byPrice.toLowerCase();
  } else if (params.byPopularity) {
    name = 'byPopularity';
    value = params.byPopularity.toLowerCase();
  } else return '';

  return `${name}-${value}`;
}

function getQueryFromSorting(value: string): NoticesSearchParamsObj {
  if (value === '') return {};

  const valueArr = value.split('-');
  return { [valueArr[0]]: valueArr[1] };
}

export default {
  getSortingFromQuery,
  getQueryFromSorting,
};
