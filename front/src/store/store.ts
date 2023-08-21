import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userRegDataReducer from "./reducers/UserRegDataSlice";
import loginDataReducer from "./reducers/LoginDataSlice";
import authReducer from "./reducers/AuthSlice";
import areaReducer from "./reducers/AreaSlice";
import streetReducer from "./reducers/StreetSlice";
import addressReducer from "./reducers/AddressFormSlice";
import elevatorFormReducer from "./reducers/ElevatorFormSlice";
import passportElevatorReducer from "./reducers/PassportElevatorFormSlice";
import employeeFormReducer from "./reducers/EmployeeFormSlice";
import listFeaturesFormReducer from "./reducers/ListFeaturesFormSlice";
import manufacturerFormSlice from "./reducers/ManufacturerFormSlice";

const rootReducer = combineReducers({
  addressReducer,
  areaReducer,
  streetReducer,
  userRegDataReducer,
  loginDataReducer,
  authReducer,
  elevatorFormReducer,
  passportElevatorReducer,
  employeeFormReducer,
  listFeaturesFormReducer,
  manufacturerFormSlice,
});

export const setupStore = () => {
  return configureStore({ reducer: rootReducer });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
