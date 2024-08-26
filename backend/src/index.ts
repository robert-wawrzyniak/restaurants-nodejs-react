import cors from "cors";
import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import { OpinionUpdateModel } from "./dto-models/opinion-update";
import { RestaurantUpdateModel } from "./dto-models/restaurant-update";
import { UserUpdateModel } from "./dto-models/user-update";
import RestaurantService from "./services/restaurant-service";
import UserService from "./services/user-service";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use(cors());

type RouteWithIdParams = { id: number };
interface RouteWithIdAndRestaurantIdParams extends RouteWithIdParams {
  restaurantId: number;
}

app
  .route("/restaurants")
  .get(async (req: Request, res: Response) => {
    const restaurants = await RestaurantService.getAll();
    res.json(restaurants);
  })
  .post(async (req: Request<{}, {}, RestaurantUpdateModel>, res: Response) => {
    const restaurant = await RestaurantService.create(req.body);
    res.json(restaurant);
  });

app
  .route("/restaurants/:id")
  .delete(async (req: Request<RouteWithIdParams>, res: Response) => {
    await RestaurantService.delete(req.params.id);
    res.sendStatus(204);
  })
  .put(
    async (
      req: Request<RouteWithIdParams, {}, RestaurantUpdateModel>,
      res: Response
    ) => {
      await RestaurantService.update(req.params.id, req.body);
      res.sendStatus(204);
    }
  );

app
  .route("/users")
  .get(async (req: Request, res: Response) => {
    const users = await UserService.getAll();
    res.json(users);
  })
  .post(async (req: Request<{}, {}, UserUpdateModel>, res: Response) => {
    const user = await UserService.create(req.body);
    res.json(user);
  });

app
  .route("/users/:id")
  .delete(async (req: Request<RouteWithIdParams>, res: Response) => {
    await UserService.delete(req.params.id);
    res.sendStatus(204);
  })
  .put(
    async (
      req: Request<RouteWithIdParams, {}, UserUpdateModel>,
      res: Response
    ) => {
      await UserService.update(req.params.id, req.body);
      res.sendStatus(204);
    }
  );

app
  .route("/users/:id/opinions")
  .get(async (req: Request<RouteWithIdParams>, res: Response) => {
    const opinions = await UserService.getUserOpinions(req.params.id);
    res.json(opinions);
  });

app
  .route("/users/:id/opinions/:restaurantId")
  .post(
    async (
      req: Request<RouteWithIdAndRestaurantIdParams, {}, OpinionUpdateModel>,
      res: Response
    ) => {
      const opinion = await UserService.addOpinion(
        req.params.id,
        req.params.restaurantId,
        req.body
      );
      res.json(opinion);
    }
  )
  .put(
    async (
      req: Request<RouteWithIdAndRestaurantIdParams, {}, OpinionUpdateModel>,
      res: Response
    ) => {
      await UserService.updateOpinion(
        req.params.id,
        req.params.restaurantId,
        req.body
      );
      res.sendStatus(204);
    }
  )
  .delete(
    async (req: Request<RouteWithIdAndRestaurantIdParams>, res: Response) => {
      await UserService.deleteOpinion(req.params.id, req.params.restaurantId);
      res.sendStatus(204);
    }
  );

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
