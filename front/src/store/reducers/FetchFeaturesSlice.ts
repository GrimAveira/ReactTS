import { IData } from "../../interface";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fetchFeatures } from "./ActionCreators";

interface FeaturesState {
  isLoading: boolean;
  error: string | undefined;
  features: IData[];
}

const initialState: FeaturesState = {
  isLoading: false,
  error: "",
  features: [],
};

export const fetchFeaturesSlice = createSlice({
  name: "featuresFetching",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchFeatures.pending.type, (state) => {
        state.isLoading = true;
      })
      .addCase(
        fetchFeatures.fulfilled.type,
        (state, action: PayloadAction<IData[]>) => {
          state.isLoading = false;
          state.features = action.payload;
        }
      )
      .addCase(
        fetchFeatures.rejected.type,
        (state, action: PayloadAction<string>) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      );
  },
});

export default fetchFeaturesSlice.reducer;
