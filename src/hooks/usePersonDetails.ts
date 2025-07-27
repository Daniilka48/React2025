import { useEffect, useState } from 'react';

interface Person {
  name: string;
  height: string;
  mass: string;
  birth_year: string;
  gender: string;
}

const usePersonDetails = (id: string) => {
  const [person, setPerson] = useState<Person | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`https://swapi.py4e.com/api/people/${id}/`);
        if (!res.ok) throw new Error(`Error ${res.status}`);
        const data = await res.json();
        setPerson(data);
      } catch (err) {
        if (err instanceof Error) setError(err.message);
        else setError('Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  return { person, loading, error };
};

export default usePersonDetails;
