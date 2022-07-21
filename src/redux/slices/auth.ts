import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import User from 'types/user';

let initState: User = {
  user_id: '',
  name: '',
  email: '',
};

let user = localStorage.getItem('user');

if (user !== null) {
  initState = JSON.parse(user);
}
const authSlice = createSlice({
  name: 'authenticate',
  initialState: initState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.user_id = action.payload.user_id;
    },
    logout: state => {
      state.email = '';
      state.name = '';
      state.user_id = '';
    },
  },
});

const authReducer = authSlice.reducer;

export const { login, logout } = authSlice.actions;

export default authReducer;
