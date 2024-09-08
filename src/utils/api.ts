import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'https://petlove.b.goit.study/api/' }),
  endpoints: (builder) => ({
    getFriends: builder.query({
      query: () => `friends/`,
    }),
  }),
});

export default api;

export const { useGetFriendsQuery } = api;
