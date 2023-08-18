import axios from "axios";
import { IData } from "../interface";

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
}
