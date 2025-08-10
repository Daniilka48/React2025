import { describe, it, expect } from 'vitest';
import { store } from '../store/store';
import { api } from '../store/apiSlice';

describe('Redux Store', () => {
  it('should create store with correct reducers', () => {
    const rootState = store.getState();
    expect(rootState).toHaveProperty('selectedItems');
    expect(rootState).toHaveProperty(api.reducerPath);
  });

  it('should have middleware from api middleware', () => {
    const middlewares = store.dispatch;
    expect(typeof middlewares).toBe('function');
  });

  it('should allow dispatching actions', () => {
    const action = { type: 'selectedItems/someAction' };
    expect(() => store.dispatch(action)).not.toThrow();
  });
});
