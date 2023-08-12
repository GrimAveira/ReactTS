import axios from "axios";
import { IData } from "../interface";

export default class AreaService {
  static async getAll(params: { signal: AbortSignal }) {
    const response = await axios.get<IData[]>(
      "http://localhost:8800/api/get/areas",
      params
    );
    return response.data;
  }
}
