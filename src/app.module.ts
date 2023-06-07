import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './app/users/users.module';
import { commonConstants } from './constants/constants';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(commonConstants.MONGO_URL),
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
