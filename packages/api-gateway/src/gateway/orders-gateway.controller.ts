import { Controller, Get, Post, Param, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('orders')
@Controller('orders')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class OrdersGatewayController {
  constructor(@Inject('ORDERS_SERVICE') private ordersClient: ClientProxy) {}

  @Get()
  async findAll() {
    return firstValueFrom(this.ordersClient.send('orders.findAll', {}));
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return firstValueFrom(this.ordersClient.send('orders.findOne', +id));
  }

  @Post()
  async create(@Body() orderData: any) {
    return firstValueFrom(this.ordersClient.send('orders.create', orderData));
  }
}