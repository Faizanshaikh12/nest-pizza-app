import { JwtService } from "@nestjs/jwt";
import { Socket } from "socket.io";
import { commonConstants } from "../constants/constants";
import { IUser } from "../app/users/users.interface";
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { WsException } from '@nestjs/websockets';
export interface AuthSocket extends Socket {
  user: IUser;
}


@Injectable()
export class AuthSocketGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  async canActivate(context: ExecutionContext): Promise<boolean>  {
    const client = context.switchToWs().getClient();
    const token = client.handshake.headers.token as string;
    console.log({ token });
    if (!token) {
      throw new WsException('Invalid credentials.');
    }

    // Perform authentication logic and check the validity of the authToken
    try {
      const options = { secret: commonConstants.JWT_SECRET };
      const payload = await this.jwtService.verifyAsync(token, options);
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      client.user = payload;
    } catch {
      throw new WsException('Invalid credentials.');
    }

    return true;
  }
}

export type SocketMiddleware = (socket: Socket, next: (err?: Error) => void) => void
export const WSAuthMiddleware = (jwtService: JwtService): SocketMiddleware => {
  return async (socket: AuthSocket, next) => {
    try {
      const token = socket.handshake.headers.token as string;
      if (!token) throw new WsException("Invalid credentials.");

      const options = { secret: commonConstants.JWT_SECRET };
      const payload = await jwtService.verifyAsync(token, options);

      socket.user = payload;
      next();
    } catch (error) {
      throw new WsException("Invalid credentials.");
    }
  };
};
