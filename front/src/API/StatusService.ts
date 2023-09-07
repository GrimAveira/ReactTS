import axios from "axios";
import { IData, ISiganlToken } from "../interface";

export default class StatusService {
  static async getAll(payload: ISiganlToken) {
    const response = await axios.get<IData[]>(
      "http://localhost:8800/api/get/status",
      {
        signal: payload.signal,
        headers: {
          Authorization: `Bearer ${payload.token}`,
        },
      }
    );
    return response.data;
  }
}
