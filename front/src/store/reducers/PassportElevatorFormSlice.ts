import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IData, IElevatorPassport, IInputChanges } from "../../interface";
import {
  fetchAddresses,
  fetchElevatorTypes,
  fetchManufacturers,
} from "./ActionCreators";
import { IAddress } from "../../interface/index";

interface ElevatorForm {
  elevatorPassport: IElevatorPassport;
  manufacturers: IData[];
  elevatorTypes: IData[];
  addresses: IAddress[];
  addressesIsLoading: boolean;
  manufacturersIsLoading: boolean;
  elevatorTypesIsLoading: boolean;
  error: string;
}

const initialState: ElevatorForm = {
  elevatorPassport: {
    serialNumber: "",
    productionYear: "",
    manufacturer: "",
    address: "",
    elevatorType: "",
  },
  manufacturers: [],
  elevatorTypes: [],
  addresses: [],
  addressesIsLoading: false,
  manufacturersIsLoading: false,
  elevatorTypesIsLoading: false,
  error: "",
};

export const passportElevatorFormSlice = createSlice({
  name: "userRegData",
  initialState,
  reducers: {
    changeElevatorPassport(state, action: PayloadAction<IInputChanges>) {
      state.elevatorPassport[action.payload.name as keyof IElevatorPassport] =
        action.payload.value;
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
          state.elevatorTypesIsLoading = false;
          state.addressesIsLoading = false;
          state.error = action.payload;
        }
      )
      .addCase(fetchElevatorTypes.pending.type, (state) => {
        state.elevatorTypesIsLoading = true;
      })
      .addCase(
        fetchElevatorTypes.fulfilled.type,
        (state, action: PayloadAction<IData[]>) => {
          state.elevatorTypesIsLoading = false;
          state.elevatorTypes = action.payload;
        }
      )
      .addCase(
        fetchElevatorTypes.rejected.type,
        (state, action: PayloadAction<string>) => {
          state.manufacturersIsLoading = false;
          state.elevatorTypesIsLoading = false;
          state.addressesIsLoading = false;
          state.error = action.payload;
        }
      )
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
          state.manufacturersIsLoading = false;
          state.elevatorTypesIsLoading = false;
          state.addressesIsLoading = false;
          state.error = action.payload;
        }
      );
  },
});

export default passportElevatorFormSlice.reducer;
export const { changeElevatorPassport } = passportElevatorFormSlice.actions;
