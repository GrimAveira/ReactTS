import { configureStore, combineReducers } from "@reduxjs/toolkit";
import necRegDataReducer from "./reducers/NecRegDataSlice";
import userRedDataReducer from "./reducers/UserRegDataSlice";

const rootReducer = combineReducers({ necRegDataReducer, userRedDataReducer });

export const setupStore = () => {
  return configureStore({ reducer: rootReducer });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
