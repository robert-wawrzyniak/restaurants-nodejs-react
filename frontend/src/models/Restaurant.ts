export interface RestaurantRequest {
  name: string;
  description: string;
}

export interface Restaurant extends RestaurantRequest {
  id: number;
}
