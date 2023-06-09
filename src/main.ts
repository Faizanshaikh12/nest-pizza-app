import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { commonConstants } from "./constants/constants";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { json, urlencoded } from "express";
import { ConfigService } from "@nestjs/config";
import { SwaggerConfig } from "./configs/config.interface";
import { Logger, ValidationPipe } from "@nestjs/common";
import { GlobalExceptionFilter } from "./filters/global-exception.filter";


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ forbidUnknownValues: false }));
  app.useGlobalFilters(new GlobalExceptionFilter());

  app.enableCors();
  app.setGlobalPrefix(commonConstants.API_PREFIX);


  app.use(json({ limit: "50mb" })); // Increase the JSON payload limit to 50mb
  app.use(urlencoded({ limit: "50mb", extended: true })); // Increase the URL-encoded payload limit to 50mb

  const configService = app.get<ConfigService>(ConfigService);
  const swaggerConfig = configService.get<SwaggerConfig>("swagger");

  if (swaggerConfig.enabled) {
    const config = new DocumentBuilder()
      .setTitle(swaggerConfig.title)
      .setDescription(swaggerConfig.description)
      .setVersion(swaggerConfig.version)
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("/api-docs", app, document);
  }
  const PORT = process.env.PORT || 3000;
  await app.listen(PORT, async () => {
    const logger = new Logger();
    logger.log(`Server started listening: http://localhost:${PORT}`);
    logger.log(`Swagger Documentation: http://localhost:${PORT}/api-docs`);
  });
}

bootstrap();
