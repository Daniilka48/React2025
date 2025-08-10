import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Person } from '../components/ResultsList';
import { getIdFromUrl } from '../utils/getIdFromUrl';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.py4e.com/api/' }),
  tagTypes: ['Characters', 'Character'],
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
      providesTags: (result, _error, arg) =>
        result
          ? [
              ...result.results.map((r) => ({
                type: 'Character' as const,
                id: getIdFromUrl(r.url),
              })),
              { type: 'Characters' as const, id: `${arg.page}-${arg.search}` },
            ]
          : [{ type: 'Characters' as const, id: `${arg.page}-${arg.search}` }],
    }),
    getCharacterById: builder.query<Person, string>({
      query: (id) => `people/${id}/`,
      providesTags: (_result, _error, id) => [{ type: 'Character', id }],
    }),
  }),
});

export const { useGetCharactersQuery, useGetCharacterByIdQuery } = api;
