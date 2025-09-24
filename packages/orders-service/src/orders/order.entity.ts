import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('jsonb')
  customerDetails: { name: string; phone: string };

  @Column('jsonb')
  products: Array<{ productId: number; quantity: number; rate: number }>;

  @Column('decimal')
  totalAmount: number;
}