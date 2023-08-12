import { IData } from "../../interface";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface NecRegDataState {
  isLoading: boolean;
  error: string;
  area: IData[];
  street: IData[];
}
interface NecRegDataPayload {
  area: IData[];
  street: IData[];
}

const initialState: NecRegDataState = {
  isLoading: false,
  error: "",
  area: [],
  street: [],
};

export const necRegDataSlice = createSlice({
  name: "necRegData",
  initialState: initialState,
  reducers: {
    necRegDataFetching(state) {
      state.isLoading = true;
    },
    necRegDataFetchingSuccess(state, action: PayloadAction<NecRegDataPayload>) {
      state.isLoading = false;
      state.error = "";
      state.area = action.payload.area;
      state.street = action.payload.street;
    },
    necRegDataFetchingError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default necRegDataSlice.reducer;
