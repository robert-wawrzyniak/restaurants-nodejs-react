import axios from "axios";
import { Restaurant, RestaurantRequest } from "../models/Restaurant";

const apiUrl = process.env.REACT_APP_API_URL;

export class Api {
  async getAllRestaurants(): Promise<Restaurant[]> {
    const url = `${apiUrl}/restaurants`;
    console.log(url);
    const response = await axios.get(url);

    return response.data;
  }

  async createRestaurants(data: RestaurantRequest): Promise<Restaurant> {
    const url = `${apiUrl}/restaurants`;
    const response = await axios.post(url, data);

    return response.data;
  }
}
