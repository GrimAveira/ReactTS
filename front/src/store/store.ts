import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userRegDataReducer from "./reducers/UserRegDataSlice";
import loginDataReducer from "./reducers/LoginDataSlice";
import authReducer from "./reducers/AuthSlice";
import areaReducer from "./reducers/AreaSlice";
import streetReducer from "./reducers/StreetSlice";
import addressReducer from "./reducers/AddressFormSlice";
import passportElevatorReducer from "./reducers/PassportElevatorFormSlice";
import employeeFormReducer from "./reducers/EmployeeFormSlice";
import listFeaturesFormReducer from "./reducers/ListFeaturesFormSlice";
import manufacturerFormReducer from "./reducers/ManufacturerFormSlice";
import fetchAddressesReducer from "./reducers/FetchAddressesSlice";
import fetchElevatorsReducer from "./reducers/FetchElevatorsSlice";
import fetchElevatorTypesReducer from "./reducers/FetchElevatorTypesSlice";
import fetchManufacturersReducer from "./reducers/FetchManufacturersSlice";
import fetchPostsReducer from "./reducers/FetchPostsSlice";
import fetchFeaturesReducer from "./reducers/FetchFeaturesSlice";
import fetchManufacturerTypesReducer from "./reducers/FetchManufacturerTypesSlice";
import partFormReducer from "./reducers/PartFormSlice";
import applicaitonFormReducer from "./reducers/ApplicationFormSlice";
import fetchApplicationsReducer from "./reducers/FetchApplicationsSlice";
import fetchEmployeeAppReducer from "./reducers/FetchEmployeeAppSlice";
import fetchBreakingTypesReducer from "./reducers/FetchBreakingTypesSlice";
import fetchApplicationsStatusesReducer from "./reducers/FetchApplicationsStatusesSlice";
import fetchApplicationsTypesReducer from "./reducers/FetchApplicationsTypesSlice";
import fetchEmployeeSliceReducer from "./reducers/FetchEmployeeSlice";

const rootReducer = combineReducers({
  partFormReducer,
  fetchManufacturerTypesReducer,
  fetchFeaturesReducer,
  fetchPostsReducer,
  fetchElevatorTypesReducer,
  fetchManufacturersReducer,
  fetchElevatorsReducer,
  fetchAddressesReducer,
  addressReducer,
  areaReducer,
  streetReducer,
  userRegDataReducer,
  loginDataReducer,
  authReducer,
  passportElevatorReducer,
  employeeFormReducer,
  listFeaturesFormReducer,
  manufacturerFormReducer,
  applicaitonFormReducer,
  fetchApplicationsReducer,
  fetchEmployeeAppReducer,
  fetchBreakingTypesReducer,
  fetchApplicationsStatusesReducer,
  fetchApplicationsTypesReducer,
  fetchEmployeeSliceReducer,
});

export const setupStore = () => {
  return configureStore({ reducer: rootReducer });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
