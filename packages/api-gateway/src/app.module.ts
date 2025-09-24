import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, 
    }),
    AuthModule,
    ClientsModule.register([
      { name: 'PRODUCTS_SERVICE', transport: Transport.TCP, options: { port: 3001 } },
      { name: 'ORDERS_SERVICE', transport: Transport.TCP, options: { port: 3002 } },
    ]),
  ],
})
export class AppModule {}