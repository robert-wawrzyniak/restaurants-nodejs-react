import Restaurant from "../../models/restaurant";
import { RestaurantUpdateModel } from "../dto-models/restaurant-update";

class RestaurantService {
  async getAll(): Promise<Restaurant[]> {
    return await Restaurant.findAll();
  }

  async create(data: RestaurantUpdateModel): Promise<Restaurant> {
    return await Restaurant.create(data);
  }

  async update(id: number, data: RestaurantUpdateModel): Promise<void> {
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
