import Restaurant from "../../models/restaurant";
import { RestaurantUpdateBody } from "../dto-models/restaurant-update-body";

class RestaurantService {
  async getAll(): Promise<Restaurant[]> {
    return await Restaurant.findAll();
  }

  async createRestaurant(data: RestaurantUpdateBody): Promise<Restaurant> {
    return await Restaurant.create(data);
  }
}

export default new RestaurantService();
