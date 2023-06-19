import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument, Model } from "mongoose";
import { User } from "./user.schema";
import { OrderStatus, PaymentTypes } from "../app/orders/orders.dto";

export type OrderDocument = HydratedDocument<Order>;

class Item {
  @Prop()
  itemId: string;

  @Prop()
  name: string;

  @Prop()
  quantity: number;

  @Prop()
  price: number;

  @Prop()
  image: string;
}

@Schema({ timestamps: true, versionKey: false })
export class Order {

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User", required: true })
  customerId: string;

  @Prop({type: Item, required: true })
  items: Item[]

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  phone: number;

  @Prop({ required: true, default: PaymentTypes.COD, enum: PaymentTypes, })
  paymentType: string;

  @Prop({ required: true, default: false })
  paymentStatus: boolean;

  @Prop({ required: true, default: OrderStatus.ORDER_PLACE, enum: OrderStatus, })
  status: string;

}

export const OrderSchema = SchemaFactory.createForClass(Order);
