import { commonConstants } from "../constants/constants";
import { IConfig } from "./config.interface";

export const CONFIG: IConfig = {
  nest: {
    port: commonConstants.PORT,
  },
  cors: {
    enabled: true,
  },
  swagger: {
    enabled: true,
    title: 'Pizza App API Documentation',
    description: 'Pizza API Endpoint',
    version: '1.0',
    path: commonConstants.API_PREFIX,
  },
  database: {
    url: commonConstants.MONGO_URL
  }
};
