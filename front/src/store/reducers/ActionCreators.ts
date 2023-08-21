import { createAsyncThunk } from "@reduxjs/toolkit";
import AreaService from "../../API/AreaService";
import StreetService from "../../API/StreetService";
import {
  IAddress,
  IElevatorPassport,
  IEmployeePost,
  IFeatureList,
  IManufacturerForm,
  IPartForm,
  IPostFormToken,
  ISiganlToken,
  ISignal,
} from "../../interface";
import UserService from "../../API/UserService";
import AddressService from "../../API/AddressService";
import AppStatusService from "../../API/AppStatusService";
import AppTypeService from "../../API/AppTypeService";
import BreakingTypeService from "../../API/BreakingTypeService";
import ElevatorService from "../../API/ElevatorService";
import { AxiosError } from "axios";
import ManufacturerService from "../../API/ManufacturerService";
import ElevatorTypeService from "../../API/ElevatorTypeService";
import EmployeeService from "../../API/EmployeeService";
import PostService from "../../API/PostService";
import FeatureService from "../../API/FeatureService";
import PartService from "../../API/PartService";

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
export const fetchManufacturers = createAsyncThunk(
  "manufacturer/getAll",
  async (
    payload: { signal: AbortSignal; token: string | null; type: string },
    thunkAPI
  ) => {
    try {
      let response;
      if (payload.token !== null)
        response = await ManufacturerService.getAll(payload);
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
export const fetchElevatorTypes = createAsyncThunk(
  "elevatorTypes/getAll",
  async (payload: { signal: AbortSignal; token: string | null }, thunkAPI) => {
    try {
      let response;
      if (payload.token !== null)
        response = await ElevatorTypeService.getAll(payload);
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
export const addElevator = createAsyncThunk(
  "API/postResponse",
  async (
    payload: {
      elevatorPassport: IElevatorPassport;
      token: string | null;
    },
    thunkAPI
  ) => {
    try {
      let response;
      if (payload.token !== null) response = await ElevatorService.add(payload);
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
export const addElevatorType = createAsyncThunk(
  "API/postResponse",
  async (payload: IPostFormToken<{ elevatorType: string }>, thunkAPI) => {
    try {
      let response;
      if (payload.token !== null)
        response = await ElevatorTypeService.add(payload);
      return response;
    } catch (error: unknown) {
      if (error instanceof AxiosError)
        return thunkAPI.rejectWithValue({
          status: error.message,
          message: error.response?.data,
        });
    }
  }
);
export const addEmployee = createAsyncThunk(
  "API/postResponse",
  async (payload: IPostFormToken<{ employee: IEmployeePost }>, thunkAPI) => {
    try {
      let response;
      if (payload.token !== null)
        response = await EmployeeService.add({
          data: payload.data,
          token: payload.token,
        });
      return response;
    } catch (error: unknown) {
      if (error instanceof AxiosError)
        return thunkAPI.rejectWithValue({
          status: error.message,
          message: error.response?.data,
        });
    }
  }
);
export const fetchPosts = createAsyncThunk(
  "post/getAll",
  async (payload: ISiganlToken, thunkAPI) => {
    try {
      let response;
      if (payload.token !== null)
        response = await PostService.getAll({
          signal: payload.signal,
          token: payload.token,
        });
      return response;
    } catch (error: unknown) {
      if (error instanceof AxiosError)
        return thunkAPI.rejectWithValue({
          status: error.message,
          message: error.response?.data,
        });
    }
  }
);
export const addFeature = createAsyncThunk(
  "API/postResponse",
  async (payload: IPostFormToken<{ feature: string }>, thunkAPI) => {
    try {
      let response;
      if (payload.token !== null)
        response = await FeatureService.add({
          data: payload.data,
          token: payload.token,
        });
      return response;
    } catch (error: unknown) {
      if (error instanceof AxiosError)
        return thunkAPI.rejectWithValue({
          status: error.message,
          message: error.response?.data,
        });
    }
  }
);
export const fetchFeatures = createAsyncThunk(
  "feature/getAll",
  async (payload: ISiganlToken, thunkAPI) => {
    try {
      let response;
      if (payload.token !== null)
        response = await FeatureService.getAll({
          signal: payload.signal,
          token: payload.token,
        });
      return response;
    } catch (error: unknown) {
      if (error instanceof AxiosError)
        return thunkAPI.rejectWithValue({
          status: error.message,
          message: error.response?.data,
        });
    }
  }
);
export const addElevatorFeature = createAsyncThunk(
  "API/postResponse",
  async (payload: IPostFormToken<{ featuresList: IFeatureList }>, thunkAPI) => {
    try {
      let response;
      if (payload.token !== null)
        response = await ElevatorService.addFeature({
          data: payload.data,
          token: payload.token,
        });
      return response;
    } catch (error: unknown) {
      if (error instanceof AxiosError)
        return thunkAPI.rejectWithValue({
          status: error.message,
          message: error.response?.data,
        });
    }
  }
);
export const fetchManufacturerType = createAsyncThunk(
  "manufacturerType/getAll",
  async (payload: ISiganlToken, thunkAPI) => {
    try {
      let response;
      if (payload.token !== null)
        response = await ManufacturerService.getAllType({
          signal: payload.signal,
          token: payload.token,
        });
      return response;
    } catch (error: unknown) {
      if (error instanceof AxiosError)
        return thunkAPI.rejectWithValue({
          status: error.message,
          message: error.response?.data,
        });
    }
  }
);
export const addManufacturer = createAsyncThunk(
  "API/postResponse",
  async (payload: IPostFormToken<IManufacturerForm>, thunkAPI) => {
    try {
      let response;
      if (payload.token !== null)
        response = await ManufacturerService.add({
          data: payload.data,
          token: payload.token,
        });
      return response;
    } catch (error: unknown) {
      if (error instanceof AxiosError)
        return thunkAPI.rejectWithValue({
          status: error.message,
          message: error.response?.data,
        });
    }
  }
);
export const addManufacturerType = createAsyncThunk(
  "API/postResponse",
  async (payload: IPostFormToken<{ manufacturerType: string }>, thunkAPI) => {
    try {
      let response;
      if (payload.token !== null)
        response = await ManufacturerService.addType({
          data: payload.data,
          token: payload.token,
        });
      return response;
    } catch (error: unknown) {
      if (error instanceof AxiosError)
        return thunkAPI.rejectWithValue({
          status: error.message,
          message: error.response?.data,
        });
    }
  }
);
export const addPart = createAsyncThunk(
  "API/postResponse",
  async (payload: IPostFormToken<IPartForm>, thunkAPI) => {
    try {
      let response;
      if (payload.token !== null)
        response = await PartService.add({
          data: payload.data,
          token: payload.token,
        });
      return response;
    } catch (error: unknown) {
      if (error instanceof AxiosError)
        return thunkAPI.rejectWithValue({
          status: error.message,
          message: error.response?.data,
        });
    }
  }
);
export const addPost = createAsyncThunk(
  "API/postResponse",
  async (payload: IPostFormToken<{ post: string }>, thunkAPI) => {
    try {
      let response;
      if (payload.token !== null)
        response = await PostService.add({
          data: payload.data,
          token: payload.token,
        });
      return response;
    } catch (error: unknown) {
      if (error instanceof AxiosError)
        return thunkAPI.rejectWithValue({
          status: error.message,
          message: error.response?.data,
        });
    }
  }
);
