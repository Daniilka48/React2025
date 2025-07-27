import { useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Search } from '../components/Search';
import { ResultsList } from '../components/ResultsList';
import Pagination from '../components/Pagination';
import PersonDetails from '../components/PersonDetails';
import useLocalStorage from '../hooks/useLocalStorage';
import '../cssComponents/MainPage.css';
import { useCharacters } from '../hooks/useCharacters';

const MainPage = () => {
  const { pageNumber, detailsId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const currentPage = parseInt(pageNumber || '1', 10);

  const queryParams = new URLSearchParams(location.search);
  const searchFromUrl = queryParams.get('search') || '';

  const [searchTerm, setSearchTerm] = useLocalStorage<string>('searchTerm', '');

  useEffect(() => {
    if (searchTerm !== searchFromUrl) {
      setSearchTerm(searchFromUrl);
    }
  }, [searchFromUrl, searchTerm, setSearchTerm]);

  const { results, loading, error } = useCharacters(currentPage, searchTerm);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    navigate(`/page/1?search=${encodeURIComponent(term)}`);
  };

  const handlePageChange = (page: number) => {
    const searchParam = searchTerm
      ? `?search=${encodeURIComponent(searchTerm)}`
      : '';
    const detailsPart = detailsId ? `/details/${detailsId}` : '';
    navigate(`/page/${page}${detailsPart}${searchParam}`);
  };

  const handleItemClick = (index: number) => {
    navigate(`/page/${currentPage}/details/${index + 1}${location.search}`);
  };

  const handleCloseDetails = () => {
    navigate(`/page/${currentPage}${location.search}`);
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
