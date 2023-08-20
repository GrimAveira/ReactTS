import axios from "axios";
import {
  IElevator,
  IElevatorPassport,
  IFeatureList,
  IPostFormToken,
} from "../interface";

export default class ElevatorService {
  static async getAll(payload: { signal: AbortSignal; token: string | null }) {
    const response = await axios.get<IElevator>(
      "http://localhost:8800/api/get/elevator",
      {
        signal: payload.signal,
        headers: {
          Authorization: `Bearer ${payload.token}`,
        },
      }
    );
    return response.data;
  }
  static async update(payload: {
    addressId: string;
    elevatorId: string;
    token: string | null;
  }) {
    const response = await axios.post(
      "http://localhost:8800/api/post/elevatorUpdate",
      { addressId: payload.addressId, elevatorId: payload.elevatorId },
      {
        headers: {
          Authorization: `Bearer ${payload.token}`,
        },
      }
    );
    return response.data;
  }
  static async delete(payload: { elevatorId: string; token: string | null }) {
    const response = await axios.post(
      "http://localhost:8800/api/post/elevatorDelete",
      { elevatorId: payload.elevatorId },
      {
        headers: {
          Authorization: `Bearer ${payload.token}`,
        },
      }
    );
    return response.data;
  }
  static async add(payload: {
    elevatorPassport: IElevatorPassport;
    token: string | null;
  }) {
    const response = await axios.post(
      "http://localhost:8800/api/post/elevator",
      payload.elevatorPassport,
      {
        headers: {
          Authorization: `Bearer ${payload.token}`,
        },
      }
    );
    return response.data;
  }
  static async addFeature(
    payload: IPostFormToken<{ featuresList: IFeatureList }>
  ) {
    const response = await axios.post(
      "http://localhost:8800/api/post/elevatorFeatures",
      payload.data.featuresList,
      {
        headers: {
          Authorization: `Bearer ${payload.token}`,
        },
      }
    );
    return response.data;
  }
}
