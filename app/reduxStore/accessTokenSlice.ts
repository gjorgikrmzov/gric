import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  accessToken: string;
}

const initialState: AuthState = {
  accessToken: '',
};

const accessTokenSlice = createSlice({
  name: 'accessToken',
  initialState,
  reducers: {
    setAccessToken(state, action: PayloadAction<string>) {
      state.accessToken = action.payload;
    },
  },
});

export const { setAccessToken } = accessTokenSlice.actions;

export default accessTokenSlice;
