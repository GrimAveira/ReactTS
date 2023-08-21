import axios from "axios";
import { IData, IPostFormToken, ISignal } from "../interface";

export default class StreetService {
  static async getAll(payload: ISignal | undefined) {
    const response = await axios.get<IData[]>(
      "http://localhost:8800/api/get/street",
      payload
    );
    return response.data;
  }
  static async add(payload: IPostFormToken<{ street: string }>) {
    const response = await axios.post(
      "http://localhost:8800/api/post/street",
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
