import { Role } from "../../models/user";

export interface UserUpdateModel {
  name: string;
  email: string;
  role: Role;
}
