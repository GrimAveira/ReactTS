import axios from "axios";
import { IData } from "../interface";

export default class ManufacturerService {
  static async getAll(payload: {
    type: string;
    signal: AbortSignal;
    token: string | null;
  }) {
    const response = await axios.get<IData>(
      "http://localhost:8800/api/get/manufacturer",
      {
        params: { type: payload.type },
        signal: payload.signal,
        headers: {
          Authorization: `Bearer ${payload.token}`,
        },
      }
    );
    return response.data;
  }
}
