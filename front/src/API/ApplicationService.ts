import axios from "axios";
import { IApplication, ISiganlToken } from "../interface";

export default class ApplicationService {
  static async getAll(payload: ISiganlToken) {
    const response = await axios.get<IApplication[]>(
      "http://localhost:8800/api/get/application",
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
