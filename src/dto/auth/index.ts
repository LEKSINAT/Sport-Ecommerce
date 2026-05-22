import { Role } from "../../models/role.model";

export interface RegisterDto {
  email: string;
  password: string;
  fullName: string;
  role?: Role;
}

export interface LoginDto {
  email: string;
  password: string;
}
