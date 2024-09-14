type getNoticesQueryParams = {
  page: number;
  limit?: number;
  keyword?: string;
  category?: string;
  species?: string;
  locationId?: string;
  byDate?: boolean;
  byPrice?: boolean;
  byPopularity?: boolean;
};

export default getNoticesQueryParams;
