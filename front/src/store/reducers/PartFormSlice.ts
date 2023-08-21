import {
  IData,
  IInputChanges,
  IManufacturer,
  IPartForm,
} from "../../interface";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fetchManufacturers, fetchStreet } from "./ActionCreators";

interface PartFormState {
  part: IPartForm;
  manufacturers: IManufacturer[];
  manufacturersIsLoading: boolean;
  error: string;
}

const initialState: PartFormState = {
  part: {
    name: "",
    manufacturer: "",
  },
  manufacturers: [],
  manufacturersIsLoading: false,
  error: "",
};

export const partFormSlice = createSlice({
  name: "partForm",
  initialState: initialState,
  reducers: {
    changePartForm(state, action: PayloadAction<IInputChanges>) {
      state.part[action.payload.name as keyof IPartForm] = action.payload.value;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchManufacturers.pending.type, (state) => {
        state.manufacturersIsLoading = true;
      })
      .addCase(
        fetchManufacturers.fulfilled.type,
        (state, action: PayloadAction<IData[]>) => {
          state.manufacturersIsLoading = false;
          state.manufacturers = action.payload;
        }
      )
      .addCase(
        fetchManufacturers.rejected.type,
        (state, action: PayloadAction<string>) => {
          state.manufacturersIsLoading = false;
          state.error = action.payload;
        }
      );
  },
});

export default partFormSlice.reducer;
