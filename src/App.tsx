import { Suspense, useMemo, useState, useCallback } from 'react';
import Spinner from './components/Spinner';
import { getCO2Resource } from './data/co2Resource';
import type {
  AppState,
  Country,
  ColumnsConfig,
  SortDir,
  SortKey,
} from './types';
import YearSelector from './components/Controls/YearSelector';
import RegionFilter from './components/Controls/RegionFilter';
import SearchBar from './components/Controls/SearchBar';
import SortControl from './components/Controls/SortControl';
import ColumnModal from './components/ColumnModal';
import CountryCard from './components/CountryCard';
import './App.css';

const resource = getCO2Resource();

function AppInner() {
  const allCountries = resource.read();
  const [state, setState] = useState<AppState>({
    year: 'latest',
    region: 'all',
    search: '',
    sortKey: 'name',
    sortDir: 'asc',
    selectedColumns: [],
  });

  const columns: ColumnsConfig = useMemo(() => {
    const required: Array<keyof Country['years'][number]> = [
      'year',
      'population',
      'co2',
      'co2_per_capita',
    ];
    const seen = new Set<string>();
    for (const c of allCountries) {
      for (const y of c.years) {
        Object.keys(y).forEach((k) => {
          if (!required.includes(k as keyof typeof y)) seen.add(k);
        });
      }
    }
    ['iso_code', 'region'].forEach((k) => seen.delete(k));
    required.forEach((k) => seen.delete(String(k)));
    return { required, optional: Array.from(seen).sort() };
  }, [allCountries]);

  const setYear = useCallback(
    (year: number | 'latest') => setState((s) => ({ ...s, year })),
    []
  );
  const setRegion = useCallback(
    (region: string | 'all') => setState((s) => ({ ...s, region })),
    []
  );
  const setSearch = useCallback(
    (search: string) => setState((s) => ({ ...s, search })),
    []
  );
  const setSort = useCallback(
    (sortKey: SortKey, sortDir: SortDir) =>
      setState((s) => ({ ...s, sortKey, sortDir })),
    []
  );
  const setSelectedColumns = useCallback(
    (cols: string[]) => setState((s) => ({ ...s, selectedColumns: cols })),
    []
  );

  const regions = useMemo(() => {
    const set = new Set<string>();
    for (const c of allCountries) if (c.region) set.add(c.region);
    return ['all', ...Array.from(set).sort()];
  }, [allCountries]);

  const visibleCountries = useMemo(() => {
    const term = state.search.trim().toLowerCase();
    const year = state.year === 'latest' ? undefined : state.year;
    let list = allCountries;

    if (state.region !== 'all')
      list = list.filter((c) => (c.region ?? 'Unknown') === state.region);
    if (term) list = list.filter((c) => c.name.toLowerCase().includes(term));

    list = [...list].sort((a, b) => {
      if (state.sortKey === 'name') {
        const r = a.name.localeCompare(b.name);
        return state.sortDir === 'asc' ? r : -r;
      }
      const ya = year ?? a.latestYear;
      const yb = year ?? b.latestYear;
      const pa = a.byYear[ya]?.population ?? -Infinity;
      const pb = b.byYear[yb]?.population ?? -Infinity;
      const r = pa - pb || a.name.localeCompare(b.name);
      return state.sortDir === 'asc' ? r : -r;
    });

    return list;
  }, [
    allCountries,
    state.region,
    state.search,
    state.sortDir,
    state.sortKey,
    state.year,
  ]);

  return (
    <div className="app-container">
      <h1 className="app-title">CO₂ Emissions — Countries</h1>

      <div className="controls-row">
        <YearSelector
          year={state.year}
          onChange={setYear}
          countries={allCountries}
        />
        <RegionFilter
          value={state.region}
          regions={regions}
          onChange={setRegion}
        />
        <SearchBar value={state.search} onChange={setSearch} />
        <SortControl
          sortKey={state.sortKey}
          sortDir={state.sortDir}
          onChange={setSort}
        />
        <ColumnModal
          config={columns}
          selected={state.selectedColumns}
          onChange={setSelectedColumns}
        />
      </div>

      <div className="country-grid">
        {visibleCountries.map((c) => (
          <CountryCard
            key={c.iso_code ?? c.key}
            country={c}
            year={state.year}
            extraColumns={state.selectedColumns}
          />
        ))}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <AppInner />
    </Suspense>
  );
}
