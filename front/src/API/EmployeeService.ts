import axios from "axios";
import { IEmployeePost, IPostFormToken } from "../interface";

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
}
