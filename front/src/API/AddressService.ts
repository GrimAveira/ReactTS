import axios from "axios";
import { IAddress, IPostFormToken } from "../interface";

export default class AddressService {
  static async add(payload: IPostFormToken<IAddress>) {
    const response = await axios.post(
      "http://localhost:8800/api/post/address",
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
