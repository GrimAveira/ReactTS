import axios from "axios";

export default class StreetService {
  static async getAll(params: {}) {
    const response = await axios.get(
      "http://localhost:8800/api/get/street",
      params
    );
    return response;
  }
}
