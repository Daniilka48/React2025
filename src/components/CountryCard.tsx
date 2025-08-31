import { memo, useEffect, useRef, useMemo } from 'react';
import type { Country } from '../types';
import DataTable from './DataTable';
import './CountryCard.css';

type Props = {
  country: Country;
  year: number | 'latest';
  extraColumns: string[];
};

function CountryCardImpl({ country, year, extraColumns }: Props) {
  const highlightRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!highlightRef.current) return;
    highlightRef.current.classList.remove('flash');
    void highlightRef.current.offsetWidth;
    highlightRef.current.classList.add('flash');
    const t = setTimeout(
      () => highlightRef.current?.classList.remove('flash'),
      700
    );
    return () => clearTimeout(t);
  }, [year]);

  const currentYear = year === 'latest' ? country.latestYear : year;
  const current = country.byYear[currentYear];
  const tableRows = useMemo(() => country.years, [country.years]);

  return (
    <div className="country-card">
      <div className="country-card-header">
        <h2>{country.name}</h2>
        <div className="iso">ISO: {country.iso_code ?? 'N/A'}</div>
      </div>

      <div ref={highlightRef} className="country-card-highlight">
        <div className="info">
          <div>
            Year: <b>{currentYear}</b>
          </div>
          <div>
            Population: <b>{current?.population?.toLocaleString() ?? 'N/A'}</b>
          </div>
          <div>
            CO₂ per capita: <b>{current?.co2_per_capita ?? 'N/A'}</b>
          </div>
        </div>
      </div>

      <div className="country-card-table">
        <DataTable rows={tableRows} extraColumns={extraColumns} />
      </div>
    </div>
  );
}

export default memo(CountryCardImpl);
