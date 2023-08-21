import { IElevator } from "../../interface";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fetchElevators } from "./ActionCreators";

interface ElevatorsState {
  isLoading: boolean;
  error: string | undefined;
  elevators: IElevator[];
}

const initialState: ElevatorsState = {
  isLoading: false,
  error: "",
  elevators: [],
};

export const fetchElevatorsSlice = createSlice({
  name: "elevatorsFetching",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchElevators.pending.type, (state) => {
        state.isLoading = true;
      })
      .addCase(
        fetchElevators.fulfilled.type,
        (state, action: PayloadAction<IElevator[]>) => {
          state.isLoading = false;
          state.elevators = action.payload;
        }
      )
      .addCase(
        fetchElevators.rejected.type,
        (state, action: PayloadAction<string>) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      );
  },
});

export default fetchElevatorsSlice.reducer;
