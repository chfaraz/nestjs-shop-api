import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ObjectIdColumn } from 'typeorm';

@ObjectType('item')
@Entity('item')
export class Item {
  @Field((type) => ID)
  @ObjectIdColumn()
  _id: string;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column()
  detail: string;

  @Field()
  @Column()
  price: number;

  @Field()
  @Column()
  quantity: number;

  @Field()
  @Column()
  userId: string;
}
