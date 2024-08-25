import Restaurant from "../../models/restaurant";
import { RestaurantUpdateBody } from "../dto-models/restaurant-update-body";

class RestaurantService {
  async getAll(): Promise<Restaurant[]> {
    return await Restaurant.findAll();
  }

  async create(data: RestaurantUpdateBody): Promise<Restaurant> {
    return await Restaurant.create(data);
  }

  async update(id: number, data: RestaurantUpdateBody): Promise<void> {
    const restaurant = await Restaurant.findByPk(id);
    restaurant?.set(data);
    await restaurant?.save();
  }

  async delete(id: number): Promise<void> {
    const restaurant = await Restaurant.findByPk(id);
    await restaurant?.destroy();
  }
}

export default new RestaurantService();
