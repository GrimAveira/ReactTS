import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IAddress, IElevator, IInputChanges } from "../../interface";
import { fetchAddresses, fetchElevators } from "./ActionCreators";

interface ElevatorForm {
  addresses: IAddress[];
  elevators: IElevator[];
  addressesIsLoading: boolean;
  elevatorsIsLoading: boolean;
  error: string;
}

const initialState: ElevatorForm = {
  addresses: [],
  elevators: [],
  addressesIsLoading: false,
  elevatorsIsLoading: false,
  error: "",
};

export const elevatorFormSlice = createSlice({
  name: "userRegData",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchAddresses.pending.type, (state) => {
        state.addressesIsLoading = true;
      })
      .addCase(
        fetchAddresses.fulfilled.type,
        (state, action: PayloadAction<IAddress[]>) => {
          state.addressesIsLoading = false;
          state.addresses = action.payload;
        }
      )
      .addCase(
        fetchAddresses.rejected.type,
        (state, action: PayloadAction<string>) => {
          state.addressesIsLoading = false;
          state.elevatorsIsLoading = false;
          state.error = action.payload;
        }
      )
      .addCase(fetchElevators.pending.type, (state) => {
        state.elevatorsIsLoading = true;
      })
      .addCase(
        fetchElevators.fulfilled.type,
        (state, action: PayloadAction<IElevator[]>) => {
          state.elevatorsIsLoading = false;
          state.elevators = action.payload;
        }
      )
      .addCase(
        fetchElevators.rejected.type,
        (state, action: PayloadAction<string>) => {
          state.addressesIsLoading = false;
          state.elevatorsIsLoading = false;
          state.error = action.payload;
        }
      );
  },
});

export default elevatorFormSlice.reducer;
