import { randomUUID } from "node:crypto";

import { Role } from "../models/role.model";
import { User } from "../models/user.model";

export class AuthRepository {
  private readonly users: User[] = [];

  async findByEmail(email: string): Promise<User | null> {
    return this.users.find((user) => user.email === email) ?? null;
  }

  async findById(id: string): Promise<User | null> {
    return this.users.find((user) => user.id === id) ?? null;
  }

  async create(input: {
    email: string;
    passwordHash: string;
    fullName: string;
    role?: Role;
  }): Promise<User> {
    const user: User = {
      id: randomUUID(),
      email: input.email,
      passwordHash: input.passwordHash,
      fullName: input.fullName,
      role: input.role ?? Role.CUSTOMER,
      createdAt: new Date(),
    };

    this.users.push(user);
    return user;
  }
}
