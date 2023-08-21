import { IAddress } from "../../interface";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fetchAddresses } from "./ActionCreators";

interface AddressesState {
  isLoading: boolean;
  error: string | undefined;
  addresses: IAddress[];
}

const initialState: AddressesState = {
  isLoading: false,
  error: "",
  addresses: [],
};

export const fetchAddressesSlice = createSlice({
  name: "addressesFetching",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchAddresses.pending.type, (state) => {
        state.isLoading = true;
      })
      .addCase(
        fetchAddresses.fulfilled.type,
        (state, action: PayloadAction<IAddress[]>) => {
          state.isLoading = false;
          state.addresses = action.payload;
        }
      )
      .addCase(
        fetchAddresses.rejected.type,
        (state, action: PayloadAction<string>) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      );
  },
});

export default fetchAddressesSlice.reducer;
