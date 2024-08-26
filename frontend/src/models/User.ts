export type Role = "Admin" | "User" | "RestaurantOwner";

export interface User {
  id: number;
  name: string;
  email: string;
  role: Role;
}
