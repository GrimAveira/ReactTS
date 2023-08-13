import axios from "axios";
import { IData, ISignal } from "../interface";

export default class AreaService {
  static async getAll(params: ISignal | undefined) {
    const response = await axios.get<IData[]>(
      "http://localhost:8800/api/get/area",
      params
    );
    return response.data;
  }
}
