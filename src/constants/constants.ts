export const commonConstants = {
  PORT: +process.env.PORT,
  MONGO_URL: process.env.MONGO_URL,
  API_PREFIX: 'api',
  JWT_SECRET: "pizzaangularnest",
  JWT_TOKEN_EXP: 60 * 60 * 24,
}
export const Roles = {
  CUSTOMER: "customer",
  ADMIN: "admin"
};
