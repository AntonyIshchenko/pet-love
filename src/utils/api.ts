import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import getNewsQueryParams from '@types-all/getNewsQueryParamsType';
import getNoticesQueryParams from '@types-all/getNoticesQueryParamsType copy';

const PAG_LIMIT = 6;
const BASE_URL = 'https://petlove.b.goit.study/api/';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getFriends: builder.query({
      query: () => `friends/`,
    }),
    getNews: builder.query({
      query: (queryParams: getNewsQueryParams) => ({
        url: `news/`,
        params: { limit: PAG_LIMIT, ...queryParams },
      }),
    }),
    getNotices: builder.query({
      query: (queryParams: getNoticesQueryParams) => ({
        url: `notices/`,
        params: { limit: PAG_LIMIT, ...queryParams },
      }),
    }),
    getCities: builder.query<void, void>({
      query: () => `cities/`,
    }),
    getCategories: builder.query<void, void>({
      query: () => `notices/categories/`,
    }),
    getSpecies: builder.query<void, void>({
      query: () => `notices/species/`,
    }),
  }),
  keepUnusedDataFor: 60,
  refetchOnMountOrArgChange: true,
});

export const {
  useGetFriendsQuery,
  useGetNewsQuery,
  useGetNoticesQuery,
  useLazyGetCitiesQuery,
  useLazyGetCategoriesQuery,
  useLazyGetSpeciesQuery,
} = api;
