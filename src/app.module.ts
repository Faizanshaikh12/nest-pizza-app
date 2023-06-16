import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule } from "@nestjs/config";
import { UsersModule } from "./app/users/users.module";
import { CONFIG } from "./configs/config";
import { MenusModule } from "./app/menus/menus.module";
import { OrdersModule } from "./app/orders/orders.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [() => CONFIG],
      cache: true,
      expandVariables: true
    }),
    MongooseModule.forRoot(process.env.MONGO_URL),
    UsersModule,
    MenusModule,
    OrdersModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
}
