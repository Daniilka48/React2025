import formsReducer, {
  addUncontrolledForm,
  addHookForm,
} from '../store/formsSlice';
import type { FormData } from '../store/formsSlice';
import { describe, expect, it } from 'vitest';

describe('formsSlice', () => {
  const initialState = { uncontrolled: [], hookForm: [] };

  it('добавляет данные для UncontrolledForm', () => {
    const newForm: FormData = {
      id: '1',
      name: 'Alice',
      age: 25,
      email: 'alice@example.com',
      password: 'Passw0rd!',
      gender: 'female',
      acceptedTnC: true,
      country: 'USA',
    };

    const state = formsReducer(initialState, addUncontrolledForm(newForm));
    expect(state.uncontrolled).toHaveLength(1);
    expect(state.uncontrolled[0].name).toBe('Alice');
  });

  it('добавляет данные для HookForm', () => {
    const newForm: FormData = {
      id: '2',
      name: 'Bob',
      age: 30,
      email: 'bob@example.com',
      password: 'Str0ng!',
      gender: 'male',
      acceptedTnC: true,
      country: 'Canada',
    };

    const state = formsReducer(initialState, addHookForm(newForm));
    expect(state.hookForm).toHaveLength(1);
    expect(state.hookForm[0].email).toBe('bob@example.com');
  });
});
