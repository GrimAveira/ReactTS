import { createAsyncThunk } from "@reduxjs/toolkit";
import AreaService from "../../API/AreaService";
import StreetService from "../../API/StreetService";
import { ISignal } from "../../interface";

export const fetchNecRegData = createAsyncThunk(
  "area/getAll",
  async (params: ISignal, thunkAPI) => {
    try {
      const area = AreaService.getAll(params);
      const street = StreetService.getAll(params);
      const response = await Promise.all([area, street]);
      return { area: response[0], street: response[1] };
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
