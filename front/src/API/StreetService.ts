import axios from "axios";
import { IData } from "../interface";

export default class StreetService {
  static async getAll(params: { signal: AbortSignal }) {
    const response = await axios.get<IData[]>(
      "http://localhost:8800/api/get/street",
      params
    );
    return response.data;
  }
}
