import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Person } from '../components/ResultsList';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.py4e.com/api/' }),
  endpoints: (builder) => ({
    getCharacters: builder.query<
      { results: Person[] },
      { page: number; search: string }
    >({
      query: ({ page, search }) => {
        const query = search.trim()
          ? `people/?search=${encodeURIComponent(search)}&page=${page}`
          : `people/?page=${page}`;
        return query;
      },
    }),
    getCharacterById: builder.query<Person, string>({
      query: (id) => `people/${id}/`,
    }),
  }),
});

export const { useGetCharactersQuery, useGetCharacterByIdQuery } = api;
