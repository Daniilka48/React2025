import { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Search } from '../components/Search';
import { ResultsList } from '../components/ResultsList';
import { Person } from '../components/ResultsList';
import Pagination from '../components/Pagination';
import PersonDetails from '../components/PersonDetails';
import useLocalStorage from '../hooks/useLocalStorage';
import '../cssComponents/App.css';

const MainPage = () => {
  const { page = '1', detailsId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useLocalStorage<string>('searchTerm', '');
  const [results, setResults] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const currentPage = parseInt(page) || 1;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const query = searchTerm.trim()
          ? `?search=${searchTerm.trim()}&page=${currentPage}`
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
    navigate('/1');
  };

  const handlePageChange = (page: number) => {
    navigate(`/${page}`);
  };

  const handleItemClick = (index: number) => {
    navigate(`/${currentPage}/${index + 1}`);
  };

  const handleCloseDetails = () => {
    navigate(`/${currentPage}`);
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
          <Pagination currentPage={currentPage} onPageChange={handlePageChange} />
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