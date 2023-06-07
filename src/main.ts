import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { commonConstants } from './constants/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(commonConstants.PORT);
}
bootstrap();
