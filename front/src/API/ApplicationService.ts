import axios from "axios";
import { IApplication, IPostFormToken, ISiganlToken } from "../interface";

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
  static async add(
    payload: IPostFormToken<{
      type: string;
      breaking: string;
      status: string;
      description: string;
      applicant: string;
      employees: number[];
    }>
  ) {
    const response = await axios.post(
      "http://localhost:8800/api/post/add",
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
