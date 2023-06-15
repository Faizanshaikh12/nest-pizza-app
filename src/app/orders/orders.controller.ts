import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { CreateOrderDto } from "./orders.dto";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "../../guards/auth.guard";

@ApiTags("orders")
@Controller("orders")
@ApiBearerAuth()
// @UseGuards(AuthGuard)

export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {
  }

  @Post("")
  @ApiOperation({ summary: "Create New Order" })
  @ApiBody({ type: [CreateOrderDto] })
  async createOrder(@Body() body: CreateOrderDto[]): Promise<{ message: string }> {
    return this.ordersService.createOrder(body);
  }

  @Get(":id")
  @ApiOperation({ summary: "Get Order customer Id wise"})
  findOne(@Param("id") id: string) {
    return this.ordersService.findOne(id);
  }

  @Get("")
  @ApiOperation({ summary: "Get All Customer Order"})
  find() {
    return this.ordersService.find();
  }

}
