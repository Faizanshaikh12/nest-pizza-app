import { OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway({ namespace: 'orders' })
export class OrdersGateway implements OnGatewayInit {
  @WebSocketServer()
  server: Server;
  private logger: Logger = new Logger('OrderGateway');

  afterInit(server: any): any {
    this.logger.log('Initialized');
  }

  @SubscribeMessage('orderUpdated')
  handleUpdateOrderEvent(client: Socket, payload: any): any {
    this.server.to(payload.event).emit('orderUpdated', payload);
  }

  updatedOrder(data) {
    this.server.emit('orderUpdated', data);
  }

  @SubscribeMessage('orderPlaced')
  handleOrderPlaced(client: Socket, payload: any): any {
    console.log({ payload });
    this.server.to(payload.event).emit('orderPlaced', payload);
  }

  orderPlaced(data) {
    console.log({data});
    this.server.emit('orderPlaced', data);
  }
}
