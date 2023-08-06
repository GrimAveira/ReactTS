import { IRegFetch, IRegFetchAction } from "../interface";

export const INITIAL_DATA = {
  area: [{}],
  street: [{}],
  loading: true,
  error: { status: false, message: "" },
};

export const regFetch = (state: IRegFetch, action: IRegFetchAction) => {
  switch (action.type) {
    case "FETCH_AREA":
      return {
        street: state.area,
        loading: state.loading,
        error: { status: state.error.status, message: state.error.message },
        area: action.payload,
      };
    case "FETCH_STREET":
      return {
        street: action.payload,
        loading: state.loading,
        error: { status: state.error.status, message: state.error.message },
        area: state.area,
      };
    case "FETCH_SUCCESS":
      return {
        error: { status: state.error.status, message: state.error.message },
        area: state.area,
        street: state.area,
        loading: false,
      };
    case "FETCH_ERROR":
      return {
        area: state.area,
        street: state.area,
        loading: false,
        error: { status: true, message: action.payload },
      };
    default:
      return state;
  }
};
