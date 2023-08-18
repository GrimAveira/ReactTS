import axios from "axios";
import { IData, IPostFormToken } from "../interface";

export default class ElevatorTypeService {
  static async getAll(payload: { token: string | null }) {
    const response = await axios.get<IData>(
      "http://localhost:8800/api/get/elevatorType",
      {
        headers: {
          Authorization: `Bearer ${payload.token}`,
        },
      }
    );
    return response.data;
  }
  static async add(payload: IPostFormToken<{ elevatorType: string }>) {
    const response = await axios.post(
      "http://localhost:8800/api/post/elevatorType",
      payload.data,
      {
        headers: {
          Authorization: `Bearer ${payload.token}`,
        },
      }
    );
    return response.data;
  }
}
