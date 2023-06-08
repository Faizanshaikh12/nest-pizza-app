import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from "@nestjs/common";
import { Request, Response } from "express";

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = "Internal server error";

    if (exception instanceof HttpException) {
      const { message: geMessage } = exception.getResponse() as any;
      if (typeof geMessage === "string") message = geMessage as string;
      else message = geMessage[0] as string;
        statusCode = exception.getStatus();
    }

    response.status(statusCode).json({
      statusCode,
      message: message
    });
  }
}
