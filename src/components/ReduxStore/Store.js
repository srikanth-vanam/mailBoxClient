import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialAuthState = { token: null, emailId: null, isLogin: false };
const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
    },
    loginHandler(state) {
      state.isLogin = !state.isLogin;
    },
    removeToken(state) {
      state.token = null;
    },
    setEmailId(state, action) {
      state.emailId = action.payload;
    },
  },
});

const initialMailState = {
  mailItems: [],
  mailIsRead: false,
};
const mailDataSlice = createSlice({
  name: "Mail Data",
  initialState: initialMailState,
  reducers: {
    mailReader(state, action) {
      state.mailIsRead = action.payload;
    },
    setMailItems(state,action){
      state.mailItems=action.payload;
    }
  },
});

const store = configureStore({
  reducer: {
    mailData: mailDataSlice.reducer,
    authenticate: authSlice.reducer,
  },
});

export const mailDataActions = mailDataSlice.actions;
export const authenticateActions = authSlice.actions;
export default store;
