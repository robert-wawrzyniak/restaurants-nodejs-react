import Opinion from "../../models/opinion";
import User from "../../models/user";
import { OpinionUpdateModel } from "../dto-models/opinion-update";
import { UserUpdateModel } from "../dto-models/user-update";

class UserService {
  async getAll(): Promise<User[]> {
    return await User.findAll();
  }

  async create(data: UserUpdateModel): Promise<User> {
    return await User.create(data);
  }

  async update(id: number, data: UserUpdateModel): Promise<void> {
    const restaurant = await User.findByPk(id);
    restaurant?.set(data);
    await restaurant?.save();
  }

  async delete(id: number): Promise<void> {
    const restaurant = await User.findByPk(id);
    await restaurant?.destroy();
  }

  async getUserOpinions(userId: number): Promise<Opinion[]> {
    return await Opinion.findAll({
      where: {
        userId: userId,
      },
    });
  }

  async addOpinion(
    userId: number,
    restaurantId: number,
    data: OpinionUpdateModel
  ): Promise<Opinion> {
    return await Opinion.create({
      userId,
      restaurantId,
      ...data,
    });
  }

  async updateOpinion(
    userId: number,
    restaurantId: number,
    data: OpinionUpdateModel
  ): Promise<void> {
    const opinion = await this.getExistingOpinion(userId, restaurantId);

    if (!opinion) {
      return;
    }

    opinion.set(data);

    await opinion.save();
  }

  async deleteOpinion(userId: number, restaurantId: number): Promise<void> {
    const opinion = await this.getExistingOpinion(userId, restaurantId);

    if (!opinion) {
      return;
    }

    await opinion.destroy();
  }

  private async getExistingOpinion(
    userId: number,
    restaurantId: number
  ): Promise<Opinion | null> {
    return await Opinion.findOne({
      where: {
        userId,
        restaurantId,
      },
    });
  }
}

export default new UserService();
