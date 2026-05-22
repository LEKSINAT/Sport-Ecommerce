import { Request, Response } from "express";

import { createApiResponse } from "../core/interceptors";
import { LoginDto, RegisterDto } from "../dto/auth";
import { AuthService } from "../services/auth.service";

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  register = async (req: Request<unknown, unknown, RegisterDto>, res: Response) => {
    const result = await this.authService.register(req.body);
    res.status(201).json(createApiResponse(result));
  };

  login = async (req: Request<unknown, unknown, LoginDto>, res: Response) => {
    const result = await this.authService.login(req.body);
    res.json(createApiResponse(result));
  };

  me = async (req: Request, res: Response) => {
    const userId = String(req.headers["x-user-id"] ?? "");
    const result = await this.authService.me(userId);
    res.json(createApiResponse(result));
  };
}
