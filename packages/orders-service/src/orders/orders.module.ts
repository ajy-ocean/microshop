import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { Order } from './order.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
    ClientsModule.register([
      { name: 'PRODUCTS_SERVICE', transport: Transport.TCP, options: { port: 3001 } },
    ]),
  ],
  providers: [OrdersService],
  controllers: [OrdersController],
})
export class OrdersModule {}