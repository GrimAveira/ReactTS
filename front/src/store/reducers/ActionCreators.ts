import { createAsyncThunk } from "@reduxjs/toolkit";
import AreaService from "../../API/AreaService";
import StreetService from "../../API/StreetService";
import { IAddress, IPostFormToken, ISignal } from "../../interface";
import UserService from "../../API/UserService";
import AddressService from "../../API/AddressService";
import AppStatusService from "../../API/AppStatusService";
import AppTypeService from "../../API/AppTypeService";
import BreakingTypeService from "../../API/BreakingTypeService";
import ElevatorService from "../../API/ElevatorService";
import { AxiosError } from "axios";

export const fetchArea = createAsyncThunk(
  "area/getAll",
  async (params: ISignal | undefined, thunkAPI) => {
    try {
      const response = await AreaService.getAll(params);
      return response;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return thunkAPI.rejectWithValue({
          status: error.message,
          message: error.response?.data,
        });
      }
    }
  }
);
export const fetchStreet = createAsyncThunk(
  "street/getAll",
  async (params: ISignal | undefined, thunkAPI) => {
    try {
      const response = await StreetService.getAll(params);
      return response;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return thunkAPI.rejectWithValue({
          status: error.message,
          message: error.response?.data,
        });
      }
    }
  }
);
export const checkAuth = createAsyncThunk(
  "user/checkAuth",
  async (token: string | null, thunkAPI) => {
    try {
      let response;
      if (token !== null) response = await UserService.authCheck(token);
      return response;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return thunkAPI.rejectWithValue({
          status: error.message,
          message: error.response?.data,
        });
      }
    }
  }
);
export const addAddress = createAsyncThunk(
  "API/postResponse",
  async (payload: IPostFormToken<IAddress>, thunkAPI) => {
    try {
      let response;
      if (payload.token !== null) response = await AddressService.add(payload);
      return response;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return thunkAPI.rejectWithValue({
          status: error.message,
          message: error.response?.data,
        });
      }
    }
  }
);
export const addAppStatus = createAsyncThunk(
  "API/postResponse",
  async (payload: IPostFormToken<{ status: string }>, thunkAPI) => {
    try {
      let response;
      if (payload.token !== null)
        response = await AppStatusService.add(payload);
      return response;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return thunkAPI.rejectWithValue({
          status: error.message,
          message: error.response?.data,
        });
      }
    }
  }
);
export const addAppType = createAsyncThunk(
  "API/postResponse",
  async (payload: IPostFormToken<{ appType: string }>, thunkAPI) => {
    try {
      let response;
      if (payload.token !== null) response = await AppTypeService.add(payload);
      return response;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return thunkAPI.rejectWithValue({
          status: error.message,
          message: error.response?.data,
        });
      }
    }
  }
);
export const addArea = createAsyncThunk(
  "API/postResponse",
  async (payload: IPostFormToken<{ area: string }>, thunkAPI) => {
    try {
      let response;
      if (payload.token !== null) response = await AreaService.add(payload);
      return response;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return thunkAPI.rejectWithValue({
          status: error.message,
          message: error.response?.data,
        });
      }
    }
  }
);
export const addBreaking = createAsyncThunk(
  "API/postResponse",
  async (payload: IPostFormToken<{ breaking: string }>, thunkAPI) => {
    try {
      let response;
      if (payload.token !== null)
        response = await BreakingTypeService.add(payload);
      return response;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return thunkAPI.rejectWithValue({
          status: error.message,
          message: error.response?.data,
        });
      }
    }
  }
);
export const fetchAddresses = createAsyncThunk(
  "address/getAll",
  async (payload: { signal: AbortSignal; token: string | null }, thunkAPI) => {
    try {
      let response;
      if (payload.token !== null)
        response = await AddressService.getAll(payload);
      return response;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return thunkAPI.rejectWithValue({
          status: error.message,
          message: error.response?.data,
        });
      }
    }
  }
);
export const fetchElevators = createAsyncThunk(
  "elevator/getAll",
  async (payload: { signal: AbortSignal; token: string | null }, thunkAPI) => {
    try {
      let response;
      if (payload.token !== null)
        response = await ElevatorService.getAll(payload);
      return response;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return thunkAPI.rejectWithValue({
          status: error.message,
          message: error.response?.data,
        });
      }
    }
  }
);
export const updateElevator = createAsyncThunk(
  "API/postResponse",
  async (
    payload: {
      addressId: string;
      elevatorId: string;
      token: string | null;
    },
    thunkAPI
  ) => {
    try {
      let response;
      if (payload.token !== null)
        response = await ElevatorService.update(payload);
      return response;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return thunkAPI.rejectWithValue({
          status: error.message,
          message: error.response?.data,
        });
      }
    }
  }
);
export const deleteElevator = createAsyncThunk(
  "API/postResponse",
  async (
    payload: {
      elevatorId: string;
      token: string | null;
    },
    thunkAPI
  ) => {
    try {
      let response;
      if (payload.token !== null)
        response = await ElevatorService.delete(payload);
      return response;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return thunkAPI.rejectWithValue({
          status: error.message,
          message: error.response?.data,
        });
      }
    }
  }
);
