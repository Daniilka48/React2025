import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface FormData {
  id: string;
  name: string;
  age: number;
  email: string;
  password: string;
  gender: string;
  acceptedTnC: boolean;
  picture?: string;
  country: string;
}

interface FormsState {
  uncontrolled: FormData[];
  hookForm: FormData[];
}

const initialState: FormsState = {
  uncontrolled: [],
  hookForm: [],
};

const formsSlice = createSlice({
  name: 'forms',
  initialState,
  reducers: {
    addUncontrolledForm: (state, action: PayloadAction<FormData>) => {
      state.uncontrolled.push(action.payload);
    },
    addHookForm: (state, action: PayloadAction<FormData>) => {
      state.hookForm.push(action.payload);
    },
  },
});

export const { addUncontrolledForm, addHookForm } = formsSlice.actions;
export default formsSlice.reducer;
