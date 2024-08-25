import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import { RestaurantUpdateBody } from "./dto-models/restaurant-update-body";
import RestaurantService from "./services/restaurant-service";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app
  .route("/restaurants")
  .get(async (req: Request, res: Response) => {
    const restaurants = await RestaurantService.getAll();
    res.json(restaurants);
  })
  .post(async (req: Request<{}, {}, RestaurantUpdateBody>, res: Response) => {
    const restaurant = await RestaurantService.createRestaurant(req.body);
    res.json(restaurant);
  });

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
