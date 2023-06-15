import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Order } from "../../schemas/order.schema";

@Injectable()
export class OrdersService {
  constructor(@InjectModel(Order.name) private orderModel: Model<Order>) {
  }

  async createOrder(body: any): Promise<{ message: string }> {
    return this.orderModel.create(body).then(() => {
      return { message: "Order Is Successfully" };
    }).catch((err) => {
      console.log("err", err);
      throw new BadRequestException(err);
    });
  }

  async findOne(id: String): Promise<Order[]> {
    return this.orderModel.find(
      { customerId: id },
      null,
      { sort: { createdAt: -1 } }
    ).then((res) => {
      return res;
    }).catch((err) => {
      throw new BadRequestException(err);
    });
  }

  async find(): Promise<Order> {
    return this.orderModel.find({ status: { $ne: "completed" } },
      null,
      { sort: { "createdAt": -1 } })
      .populate("customerId", "-password")
      .then((res) => {
        return res;
      }).catch((err) => {
        console.log("err", err);
        return err;
      });
  }
}
