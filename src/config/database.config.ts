import { environment } from "./environment";

export const databaseConfig = {
  url: environment.databaseUrl,
  synchronize: environment.nodeEnv !== "production",
  logging: environment.nodeEnv === "development",
};
