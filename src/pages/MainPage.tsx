import { useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Search } from '../components/Search';
import { ResultsList } from '../components/ResultsList';
import Pagination from '../components/Pagination';
import PersonDetails from '../components/PersonDetails';
import useLocalStorage from '../hooks/useLocalStorage';
import { getIdFromUrl } from '../utils/getIdFromUrl';
import Flyout from '../components/Flyout';
import '../cssComponents/MainPage.css';
import '../cssComponents/Flyout.css';
import { useGetCharactersQuery } from '../store/apiSlice';

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

  const { data, error, isLoading, refetch } = useGetCharactersQuery({
    page: currentPage,
    search: searchTerm,
  });

  const results = data?.results || [];

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
    const id = getIdFromUrl(results[index].url);
    navigate(`/page/${currentPage}/details/${id}${location.search}`);
  };

  const handleCloseDetails = () => {
    navigate(`/page/${currentPage}${location.search}`);
  };

  const errorMessage = error
    ? 'Ошибка загрузки данных'
    : null;

  return (
    <div className="main-container">
      <div className="left-panel">
        <Search searchTerm={searchTerm} onSearch={handleSearch} />
        <button onClick={() => refetch()}>
          Обновить данные
        </button>
        <ResultsList
          results={results}
          loading={isLoading}
          error={errorMessage}
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
      <Flyout />
    </div>
  );
};

export default MainPage;
