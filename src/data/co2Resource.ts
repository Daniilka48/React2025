import type { RawCO2Data, Country, YearData } from '../types';

type Resource<T> = { read: () => T };

let _resource: Resource<Country[]> | null = null;

function createResource<T>(promise: Promise<T>): Resource<T> {
  let status: 'pending' | 'success' | 'error' = 'pending';
  let result: T | undefined;
  let error: unknown;

  const suspender = promise.then(
    (r: T) => {
      status = 'success';
      result = r;
    },
    (e: unknown) => {
      status = 'error';
      error = e;
    }
  );

  return {
    read() {
      if (status === 'pending') throw suspender;
      if (status === 'error') throw error;
      if (result === undefined) {
        throw new Error('Resource finished without result');
      }
      return result;
    },
  };
}

async function fetchAndNormalize(): Promise<Country[]> {
  const res = await fetch('/data/co2-data.json', { cache: 'force-cache' });
  const raw: RawCO2Data = await res.json();

  const countries: Country[] = Object.entries(raw).map(([key, years]) => {
    const byYear: Record<number, YearData> = {};
    let iso: string | undefined;
    let region: string | undefined;

    for (const y of years) {
      byYear[y.year] = y;
      if (!iso && typeof y.iso_code === 'string') iso = y.iso_code;
      if (!region && typeof (y as YearData).region === 'string')
        region = (y as YearData).region;
    }
    const latestYear = years.reduce(
      (acc, y) => (y.year > acc ? y.year : acc),
      years[0]?.year ?? 0
    );

    return {
      key,
      name: key,
      iso_code: iso,
      region,
      years: years.sort((a, b) => a.year - b.year),
      byYear,
      latestYear,
    };
  });

  return countries;
}

export function getCO2Resource(): Resource<Country[]> {
  if (!_resource) {
    _resource = createResource(fetchAndNormalize());
  }
  return _resource;
}
