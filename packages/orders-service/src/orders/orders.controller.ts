import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { OrdersService } from './orders.service';
import { Order } from './order.entity';

@Controller()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @MessagePattern('orders.findAll')
  findAll(): Promise<Order[]> {
    return this.ordersService.findAll();
  }

  @MessagePattern('orders.findOne')
  findOne(id: number): Promise<Order> {
    return this.ordersService.findOne(id);
  }

  @MessagePattern('orders.create')
  create(orderData: { customerDetails: { name: string; phone: string }; products: Array<{ productId: number; quantity: number }> }): Promise<Order> {
    return this.ordersService.create(orderData);
  }
}