import {
  ConnectedSocket,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer, WsException
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { ArgumentsHost, Catch, Logger, UnauthorizedException, UseGuards } from "@nestjs/common";
import { AuthSocketGuard, WSAuthMiddleware } from "../guards/authSocket.guard";
import { JwtService } from "@nestjs/jwt";


@Catch(WsException)
export class WsExceptionFilter implements WsExceptionFilter {
  catch(exception: WsException, host: ArgumentsHost) {
    const client = host.switchToWs().getClient();
    client.emit('error', { message: exception.message });
  }
}

@WebSocketGateway({
  transports: ["websocket"],
  cors: {
    origin: "*"
  },
  namespace: "/"
})
export class EventsGateway implements OnGatewayInit {
  @WebSocketServer()
  server: Server;
  private logger: Logger = new Logger("JoinGateway");

  afterInit(server: any): any {
    this.logger.log("Initialized");
  }

  handleDisconnect(client: Socket) {
    console.log("client disconnect", client.id);
  }

  handleConnection(client: Socket, ...args: any[]) {
    console.log('client connect', client.id);
  }

  @SubscribeMessage("join")
  handleJoinEvent(client: Socket, orderId: string): void {
    client.join(orderId);
    this.server.emit("join", {message: "Room Joined"});
  }

  joinEvent(orderId) {
    this.server.emit("join", orderId);
  }
}
