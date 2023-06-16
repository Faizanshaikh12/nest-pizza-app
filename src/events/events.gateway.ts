import {
  ConnectedSocket,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway({ namespace: '' })
export class EventsGateway implements OnGatewayInit {
  @WebSocketServer()
  server: Server;
  private logger: Logger = new Logger('JoinGateway');

  afterInit(server: any): any {
    this.logger.log('Initialized');
  }

  @SubscribeMessage('join')
  handleJoinEvent(client: Socket, orderId: string): void {
    console.log({ orderId });
    client.join(orderId);
  }

  joinEvent(orderId) {
    this.server.emit('join', orderId);
  }
}
