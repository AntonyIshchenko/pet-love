import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import getNewsQueryParams from '@types-all/getNewsQueryParamsType';
import getNoticesQueryParams from '@types-all/getNoticesQueryParamsType copy';

const PAG_LIMIT = 6;
const BASE_URL = 'https://petlove.b.goit.study/api/';

const api = createApi({
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
  }),
});

export default api;

export const { useGetFriendsQuery, useGetNewsQuery, useGetNoticesQuery } = api;
