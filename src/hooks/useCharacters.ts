import { useEffect, useState } from 'react';
import type { Person } from '../components/ResultsList';

export function useCharacters(page: number, search: string) {
  const [results, setResults] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const query = search.trim()
          ? `?search=${encodeURIComponent(search)}&page=${page}`
          : `?page=${page}`;
        const res = await fetch(`https://swapi.py4e.com/api/people/${query}`);
        if (!res.ok) throw new Error(`Ошибка: ${res.status}`);
        const data = await res.json();
        setResults(data.results);
      } catch (err) {
        if (err instanceof Error) setError(err.message);
        else setError('Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, search]);

  return { results, loading, error };
}
