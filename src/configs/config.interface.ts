export interface IConfig {
  nest: NestConfig;
  cors: CorsConfig;
  swagger: SwaggerConfig;
  database: DbConfig;
}

export interface NestConfig {
  port: number;
}

export interface CorsConfig {
  enabled: boolean;
}

export interface DbConfig {
  url: string;
}

export interface SwaggerConfig {
  enabled: boolean;
  title: string;
  description: string;
  version: string;
  path: string;
}
