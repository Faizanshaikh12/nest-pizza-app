import { ApiProperty } from "@nestjs/swagger";
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString
} from "class-validator";
import { Type } from "class-transformer";

export enum PaymentTypes {
  COD = "COD",
  POD = "POD"
}

export enum OrderStatus {
  ORDER_PLACE = "ORDER_PLACE",
  ORDER_CONFIRM = "ORDER_CONFIRM",
  PREPARATION = "PREPARATION",
  OUT_FOR_DELIVERY = "OUT_FOR_DELIVERY",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED"
}

export class OrderItemDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  itemId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  image: string;
}

export class CreateOrderDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  customerId: string;

  @ApiProperty({ type: [OrderItemDto] })
  @IsArray()
  @Type(() => OrderItemDto)
  items: OrderItemDto[];

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  phone: Number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsEnum(PaymentTypes)
  paymentType: string;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  paymentStatus: boolean;
}


export class UpdateOrderStatusDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsEnum(OrderStatus)
  status: string;
}
