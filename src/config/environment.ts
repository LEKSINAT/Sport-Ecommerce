const toNumber = (value: string | undefined, fallback: number): number => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

export const environment = {
  nodeEnv: process.env.NODE_ENV ?? "development",
  port: toNumber(process.env.PORT, 3000),
  databaseUrl: process.env.DATABASE_URL ?? "postgres://localhost:5432/sport_ecommerce",
  jwtSecret: process.env.JWT_SECRET ?? "sport-ecommerce-secret",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN ?? "1d",
};

export type Environment = typeof environment;
