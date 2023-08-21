import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IData, IInputChanges, IManufacturerForm } from "../../interface";
import { fetchManufacturerType } from "./ActionCreators";

interface ManufacturerFormData {
  manufacturer: IManufacturerForm;
  manufacturerTypes: IData[];
  manufacturerTypesIsLoading: boolean;
  error: string;
}

const initialState: ManufacturerFormData = {
  manufacturer: {
    name: "",
    type: "",
  },
  manufacturerTypes: [],
  manufacturerTypesIsLoading: false,
  error: "",
};

export const manufacturerFormSlice = createSlice({
  name: "manufacturerForm",
  initialState,
  reducers: {
    changeManufacturerFormData(state, action: PayloadAction<IInputChanges>) {
      state.manufacturer[action.payload.name as keyof IManufacturerForm] =
        action.payload.value;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchManufacturerType.pending.type, (state) => {
        state.manufacturerTypesIsLoading = true;
      })
      .addCase(
        fetchManufacturerType.fulfilled.type,
        (state, action: PayloadAction<IData[]>) => {
          state.manufacturerTypes = action.payload;
          state.manufacturerTypesIsLoading = false;
        }
      )
      .addCase(
        fetchManufacturerType.rejected.type,
        (state, action: PayloadAction<string>) => {
          state.manufacturerTypesIsLoading = false;
          state.error = action.payload;
        }
      );
  },
});

export const { changeManufacturerFormData } = manufacturerFormSlice.actions;
export default manufacturerFormSlice.reducer;
