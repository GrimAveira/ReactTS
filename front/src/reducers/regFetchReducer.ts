import { IRegFetch, IRegFetchAction } from "../interface/index";

export const INITIAL_DATA: IRegFetch = {
  area: [],
  street: [],
  loading: true,
  error: "",
};

export const regFetch = (state: IRegFetch, action: IRegFetchAction) => {
  switch (action.type) {
    case "FETCH_AREA":
      return {
        ...state,
        area: action.payload.data,
      };
    case "FETCH_STREET":
      return {
        ...state,
        street: action.payload.data,
      };
    case "FETCH_SUCCESS":
      return {
        ...state,
        loading: false,
      };
    case "FETCH_ERROR":
      return {
        ...state,
        error: action.payload.error,
      };
    default:
      return state;
  }
};
