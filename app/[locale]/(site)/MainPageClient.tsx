'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from '../../../app/navigation';
import '../../../src/cssComponents/MainPage.css';
import '../../../src/cssComponents/Flyout.css';
import { useGetCharactersQuery } from '../../../src/store/apiSlice';
import Flyout from '../../../src/components/Flyout';
import useLocalStorage from '../../../src/hooks/useLocalStorage';
import PersonDetails from '../../../src/components/PersonDetails';
import Pagination from '../../../src/components/Pagination';
import { ResultsList } from '../../../src/components/ResultsList';
import { Search } from '../../../src/components/Search';
import { useTranslations } from 'next-intl';

type Props = {
  initialPage: number;
  initialSearch: string;
  initialDetailsId?: string;
};

export default function MainPageClient({
  initialPage,
  initialSearch,
  initialDetailsId,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const [searchTerm, setSearchTerm] = useLocalStorage<string>(
    'searchTerm',
    initialSearch
  );
  const currentPage = initialPage;
  const detailsId = initialDetailsId;

  const { data, error, isLoading, refetch } = useGetCharactersQuery({
    page: currentPage,
    search: searchTerm,
  });

  useEffect(() => {
    const params = new URLSearchParams();
    if (searchTerm) params.set('search', searchTerm);
    params.set('page', String(currentPage));
    if (detailsId) params.set('details', detailsId);
    router.replace(`${pathname}?${params.toString()}`);
  }, [currentPage, detailsId, pathname, router, searchTerm]);

  const results = data?.results || [];

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    const params = new URLSearchParams();
    if (term) params.set('search', term);
    params.set('page', '1');
    router.push(`${pathname}?${params.toString()}`);
  };

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams();
    if (searchTerm) params.set('search', searchTerm);
    params.set('page', String(page));
    if (detailsId) params.set('details', detailsId);
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleItemClick = (index: number) => {
    const url = results[index].url;
    const id = url.split('/').filter(Boolean).pop()!;
    const params = new URLSearchParams();
    if (searchTerm) params.set('search', searchTerm);
    params.set('page', String(currentPage));
    params.set('details', id);
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleCloseDetails = () => {
    const params = new URLSearchParams();
    if (searchTerm) params.set('search', searchTerm);
    params.set('page', String(currentPage));
    router.push(`${pathname}?${params.toString()}`);
  };

  const t = useTranslations();
  const errorMessage = error ? t('details_error') : null;

  return (
    <div className="main-container">
      <div className="left-panel">
        <Search searchTerm={searchTerm} onSearch={handleSearch} />
        <button onClick={() => refetch()}> {t('details_update')} </button>
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
}
