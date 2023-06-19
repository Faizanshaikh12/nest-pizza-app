import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from '../../schemas/order.schema';
import { OrdersGateway } from '../../events/orders/orders.gateway';
import * as _ from 'lodash';
import {OrderStatus} from "./orders.dto";

@Injectable()
export class OrdersService {
  constructor(@InjectModel(Order.name) private orderModel: Model<Order>,
              private orderGateway: OrdersGateway,
  ) {
  }

  async createOrder(body: any): Promise<{ message: string }> {
    return this.orderModel.create(body).then((res) => {
      this.orderGateway.orderPlaced(res[0]);
      return { message: 'Order Is Successfully' };
    }).catch((err) => {
      console.log("err", err);
      throw new BadRequestException(err);
    });
  }

  async findOne(id: String): Promise<Order[]> {
    return this.orderModel.find(
      { customerId: id },
      null,
      { sort: { createdAt: -1 } },
    ).then((res) => {
      return res;
    }).catch((err) => {
      throw new BadRequestException(err);
    });
  }

  async find(): Promise<Order> {
    return this.orderModel.find({ status: { $ne: OrderStatus.COMPLETED } },
      null,
      { sort: { 'createdAt': -1 } })
      .populate('customerId', '-password')
      .then((res) => {
        return res;
      }).catch((err) => {
        console.log('err', err);
        return err;
      });
  }

  async updateOrderStatus(orderId: string, status: string): Promise<{ message: string }> {
    const order = await this.orderModel.findById(orderId);
    if (_.isEmpty(order)) throw new NotFoundException('Order id is not found');

    await this.orderModel.updateOne({ _id: orderId }, { $set: { status } });
    this.orderGateway.updatedOrder({ room: orderId, _id: orderId, status });

    return { message: 'Order Is Successfully' };
  }

  async findOrderById(id: string): Promise<Order>{
    return this.orderModel.findById(id).then(res => {
      return res
    }).catch(err => {
      throw new BadRequestException(err);
    });
  }
}
