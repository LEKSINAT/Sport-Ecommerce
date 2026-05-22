import { RegisterDto, LoginDto } from "../dto/auth";
import { AppError } from "../core/errors";
import { AuthRepository } from "../repositories/auth.repository";

export class AuthService {
  constructor(private readonly authRepository: AuthRepository) {}

  async register(dto: RegisterDto) {
    const existingUser = await this.authRepository.findByEmail(dto.email);

    if (existingUser) {
      throw new AppError("User already exists.", 409);
    }

    const user = await this.authRepository.create({
      email: dto.email,
      fullName: dto.fullName,
      passwordHash: this.hashPassword(dto.password),
      role: dto.role,
    });

    return {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
    };
  }

  async login(dto: LoginDto) {
    const user = await this.authRepository.findByEmail(dto.email);

    if (!user || user.passwordHash !== this.hashPassword(dto.password)) {
      throw new AppError("Invalid email or password.", 401);
    }

    return {
      accessToken: `token-${user.id}`,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
      },
    };
  }

  async me(userId: string) {
    const user = await this.authRepository.findById(userId);

    if (!user) {
      throw new AppError("User not found.", 404);
    }

    return {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
    };
  }

  private hashPassword(password: string): string {
    return `hashed:${password}`;
  }
}
