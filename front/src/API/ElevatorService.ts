import axios from "axios";

export default class ElevatorService {
  static async getAll(payload: { signal: AbortSignal; token: string | null }) {
    const response = await axios.get("http://localhost:8800/api/get/elevator", {
      signal: payload.signal,
      headers: {
        Authorization: `Bearer ${payload.token}`,
      },
    });
    return response.data;
  }
  static async update(payload: {
    addressId: string;
    elevatorId: string;
    token: string | null;
  }) {
    const response = await axios.post(
      "http://localhost:8800/api/post/elevatorUpdate",
      { addressId: payload.addressId, elevatorId: payload.elevatorId },
      {
        headers: {
          Authorization: `Bearer ${payload.token}`,
        },
      }
    );
    return response.data;
  }
  static async delete(payload: { elevatorId: string; token: string | null }) {
    const response = await axios.post(
      "http://localhost:8800/api/post/elevatorDelete",
      { elevatorId: payload.elevatorId },
      {
        headers: {
          Authorization: `Bearer ${payload.token}`,
        },
      }
    );
    return response.data;
  }
}
