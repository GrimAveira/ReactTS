import { IData } from "../../interface";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fetchElevatorTypes } from "./ActionCreators";

interface ElevatorsState {
  isLoading: boolean;
  error: string | undefined;
  elevatorTypes: IData[];
}

const initialState: ElevatorsState = {
  isLoading: false,
  error: "",
  elevatorTypes: [],
};

export const fetchElevatorTypesSlice = createSlice({
  name: "elevatorTypesFetching",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchElevatorTypes.pending.type, (state) => {
        state.isLoading = true;
      })
      .addCase(
        fetchElevatorTypes.fulfilled.type,
        (state, action: PayloadAction<IData[]>) => {
          state.isLoading = false;
          state.elevatorTypes = action.payload;
        }
      )
      .addCase(
        fetchElevatorTypes.rejected.type,
        (state, action: PayloadAction<string>) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      );
  },
});

export default fetchElevatorTypesSlice.reducer;
