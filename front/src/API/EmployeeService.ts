import axios from "axios";
import {
  IEmployee,
  IEmployeePost,
  IPostFormToken,
  ISiganlToken,
} from "../interface";

export default class EmployeeService {
  static async add(payload: IPostFormToken<{ employee: IEmployeePost }>) {
    const response = await axios.post(
      "http://localhost:8800/api/post/employee",
      payload.data.employee,
      {
        headers: {
          Authorization: `Bearer ${payload.token}`,
        },
      }
    );
    return response.data;
  }
  static async getEmployeeApplication(payload: ISiganlToken) {
    const response = await axios.get<IEmployee[]>(
      "http://localhost:8800/api/get/employeeApplication",
      {
        signal: payload.signal,
        headers: {
          Authorization: `Bearer ${payload.token}`,
        },
      }
    );
    return response.data;
  }
  static async getAll(payload: ISiganlToken) {
    const response = await axios.get<IEmployee[]>(
      "http://localhost:8800/api/get/allEmployees",
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
