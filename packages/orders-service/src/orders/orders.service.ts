import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { Order } from './order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    @Inject('PRODUCTS_SERVICE') private productsClient: ClientProxy,
  ) {}

  async create(orderData: {
    customerDetails: { name: string; phone: string };
    products: Array<{ productId: number; quantity: number }>;
  }): Promise<Order> {
    let totalAmount = 0;
    const productsWithRates = await Promise.all(
      orderData.products.map(async (p) => {
        const product = await firstValueFrom(this.productsClient.send('products.findOne', p.productId));
        const subtotal = product.rate * p.quantity;
        totalAmount += subtotal;
        return { ...p, rate: product.rate };
      }),
    );

    const order = this.ordersRepository.create({
      ...orderData,
      products: productsWithRates,
      totalAmount,
    });
    return this.ordersRepository.save(order);
  }

  findAll(): Promise<Order[]> {
    return this.ordersRepository.find();
  }

  findOne(id: number): Promise<Order> {
    return this.ordersRepository.findOneBy({ id });
  }
}