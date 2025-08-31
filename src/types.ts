export type YearData = {
  year: number;
  population?: number;
  co2?: number;
  co2_per_capita?: number;
  methane?: number;
  oil_co2?: number;
  temperature_change_from_co2?: number;
  iso_code?: string;
  region?: string;
  [key: string]: number | string | undefined;
};

export type RawCO2Data = Record<string, YearData[]>;

export type Country = {
  key: string;
  name: string;
  iso_code?: string;
  region?: string;
  years: YearData[];
  byYear: Record<number, YearData>;
  latestYear: number;
};

export type SortKey = 'name' | 'population';
export type SortDir = 'asc' | 'desc';

export type AppState = {
  year: number | 'latest';
  region: string | 'all';
  search: string;
  sortKey: SortKey;
  sortDir: SortDir;
  selectedColumns: string[];
};

export type ColumnsConfig = {
  required: Array<keyof YearData>;
  optional: string[];
};
