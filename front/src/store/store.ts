import { configureStore, combineReducers } from "@reduxjs/toolkit";
import necRegDataReducer from "./reducers/NecRegDataSlice";
import userRegDataReducer from "./reducers/UserRegDataSlice";
import loginDataReducer from "./reducers/LoginDataSlice";
import authReducer from "./reducers/AuthSlice";

const rootReducer = combineReducers({
  necRegDataReducer,
  userRegDataReducer,
  loginDataReducer,
  authReducer,
});

export const setupStore = () => {
  return configureStore({ reducer: rootReducer });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
