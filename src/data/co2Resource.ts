import type { RawCO2Data, Country, YearData } from '../types';

type Resource<T> = { read: () => T };

const _resource: Resource<Country[]> | null = null;

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
