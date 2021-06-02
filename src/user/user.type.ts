import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ObjectIdColumn } from 'typeorm';

@ObjectType('user')
@Entity('user')
export class User {
  @Field((type) => ID)
  @ObjectIdColumn()
  _id: string;

  @Field()
  @Column()
  firstName: string;

  @Field()
  @Column()
  lastName: string;

  @Field()
  @Column({ unique: true })
  userName: string;

  @Field()
  @Column()
  password: string;

  @Field()
  @Column({ default: false })
  active: boolean;
}
