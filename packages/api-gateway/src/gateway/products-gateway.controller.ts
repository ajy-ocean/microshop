import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('products')
@Controller('products')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class ProductsGatewayController {
  constructor(@Inject('PRODUCTS_SERVICE') private productsClient: ClientProxy) {}

  @Get()
  async findAll() {
    return firstValueFrom(this.productsClient.send('products.findAll', {}));
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return firstValueFrom(this.productsClient.send('products.findOne', +id));
  }

  @Post()
  async create(@Body() product: any) {
    return firstValueFrom(this.productsClient.send('products.create', product));
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() product: any) {
    return firstValueFrom(this.productsClient.send('products.update', { id: +id, product }));
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return firstValueFrom(this.productsClient.send('products.remove', +id));
  }
}