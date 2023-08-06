import { IRegFetch, IRegFetchAction } from "../interface";

export const INITIAL_DATA = {
  loading: true,
  area: [],
  street: [],
  error: { status: false, message: "" },
};

export const regFetchReducer = (state: IRegFetch, action: IRegFetchAction) => {
  switch (action.type) {
    case "FETCH_AREA":
      return {
        ...state,
        area: action.payload,
      };
    case "FETCH_STREET":
      return {
        ...state,
        street: action.payload,
      };
    case "FETCH_SUCCESS":
      return {
        ...state,
        loading: false,
      };
    case "FETCH_ERROR":
      return {
        loading: false,
        area: [],
        street: [],
        error: { status: true, message: action.payload },
      };
    default:
      return state;
  }
};
