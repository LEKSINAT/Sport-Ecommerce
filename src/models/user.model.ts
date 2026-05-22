import { Role } from "./role.model";

export interface User {
  id: string;
  email: string;
  passwordHash: string;
  fullName: string;
  role: Role;
  createdAt: Date;
}
