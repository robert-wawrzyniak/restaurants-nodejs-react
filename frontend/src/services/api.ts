import axios from "axios";
import config from "../config.json";
import { Restaurant, RestaurantRequest } from "../models/Restaurant";

export class Api {
  async getAllRestaurants(): Promise<Restaurant[]> {
    const url = `${config.apiUrl}/restaurants`;
    const response = await axios.get(url);

    return response.data;
  }

  async createRestaurants(data: RestaurantRequest): Promise<Restaurant> {
    const url = `${config.apiUrl}/restaurants`;
    const response = await axios.post(url, data);

    return response.data;
  }
}
