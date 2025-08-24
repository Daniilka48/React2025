import countriesReducer from '../store/countriesSlice';
import { describe, expect, it } from 'vitest';

describe('countriesSlice', () => {
  it('инициализируется со списком стран', () => {
    const state = countriesReducer(undefined, { type: '@@INIT' });
    expect(state.countries).toContain('USA');
    expect(state.countries).toContain('Japan');
  });
});
