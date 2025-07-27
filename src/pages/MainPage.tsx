import { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Search } from '../components/Search';
import { ResultsList } from '../components/ResultsList';
import type { Person } from '../components/ResultsList';
import Pagination from '../components/Pagination';
import PersonDetails from '../components/PersonDetails';
import useLocalStorage from '../hooks/useLocalStorage';
import '../cssComponents/App.css';

const MainPage = () => {
  const { detailsId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const searchFromUrl = queryParams.get('search') || '';
  const pageFromUrl = parseInt(queryParams.get('page') || '1', 10);

  const [searchTerm, setSearchTerm] = useLocalStorage<string>('searchTerm', '');

  const [results, setResults] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const currentPage = pageFromUrl || 1;

  useEffect(() => {
    if (searchTerm !== searchFromUrl) {
      setSearchTerm(searchFromUrl);
    }
  }, [searchFromUrl, searchTerm, setSearchTerm]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const query = searchTerm.trim()
          ? `?search=${encodeURIComponent(searchTerm.trim())}&page=${currentPage}`
          : `?page=${currentPage}`;
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
  }, [searchTerm, currentPage]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    navigate(`/?search=${encodeURIComponent(term)}&page=1`);
  };

  const handlePageChange = (page: number) => {
    const searchParam = searchTerm
      ? `&search=${encodeURIComponent(searchTerm)}`
      : '';
    navigate(`/?page=${page}${searchParam}`);
  };

  const handleItemClick = (index: number) => {
    navigate(`/${currentPage}/${index + 1}${location.search}`);
  };

  const handleCloseDetails = () => {
    navigate(`/${currentPage}${location.search}`);
  };

  return (
    <div className="main-container">
      <div className="left-panel">
        <Search searchTerm={searchTerm} onSearch={handleSearch} />
        <ResultsList
          results={results}
          loading={loading}
          error={error}
          onItemClick={handleItemClick}
        />
        {results.length > 0 && (
          <Pagination
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        )}
      </div>

      {detailsId && (
        <div className="right-panel">
          <PersonDetails id={detailsId} onClose={handleCloseDetails} />
        </div>
      )}
    </div>
  );
};

export default MainPage;
