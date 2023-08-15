import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userRegDataReducer from "./reducers/UserRegDataSlice";
import loginDataReducer from "./reducers/LoginDataSlice";
import authReducer from "./reducers/AuthSlice";
import areaReducer from "./reducers/AreaSlice";
import streetReducer from "./reducers/StreetSlice";
import addressReducer from "./reducers/AddressFormSlice";
import appStatusReducer from "./reducers/AppStatusSlice";

const rootReducer = combineReducers({
  addressReducer,
  areaReducer,
  streetReducer,
  userRegDataReducer,
  loginDataReducer,
  authReducer,
  appStatusReducer,
});

export const setupStore = () => {
  return configureStore({ reducer: rootReducer });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
