import { environment } from "./environment";

export const jwtConfig = {
  secret: environment.jwtSecret,
  expiresIn: environment.jwtExpiresIn,
};
