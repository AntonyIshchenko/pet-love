type NoticesSearchParamsUrl = {
  byDate?: string;
  byPrice?: string;
  byPopularity?: string;
};

type NoticesSearchParamsObj = {
  byDate?: boolean;
  byPrice?: boolean;
  byPopularity?: boolean;
};

function getSortingFromQuery(params: NoticesSearchParamsUrl): string {
  let name, value;
  if (params.byDate) {
    name = 'byDate';
    value = params.byDate;
  } else if (params.byPrice) {
    name = 'byPrice';
    value = params.byPrice;
  } else if (params.byPopularity) {
    name = 'byPopularity';
    value = params.byPopularity;
  } else return '';

  return `${name}-${value.toLowerCase() === 'true' ? 1 : 0}`;
}

function getQueryFromSorting(value: string): NoticesSearchParamsObj {
  if (value === '') return {};

  const valueArr = value.split('-');
  return { [valueArr[0]]: Boolean(valueArr[1]) };
}

export default {
  getSortingFromQuery,
  getQueryFromSorting,
};
