import { Module } from '@nestjs/common';
import { EventsGateway } from "./events.gateway";
import { OrdersModule } from './orders/orders.module';

@Module({
  providers: [EventsGateway],
  imports: [OrdersModule]
})
export class EventsModule {}
