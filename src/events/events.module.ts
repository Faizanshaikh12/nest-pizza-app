import { Module } from "@nestjs/common";
import { EventsGateway, WsExceptionFilter } from "./events.gateway";
import { OrdersModule } from "./orders/orders.module";
import { AuthSocketGuard } from "../guards/authSocket.guard";
import { APP_FILTER } from "@nestjs/core";

@Module({
  providers: [EventsGateway, AuthSocketGuard, {
    provide: APP_FILTER,
    useClass: WsExceptionFilter
  }],
  imports: [OrdersModule]
})
export class EventsModule {
}
