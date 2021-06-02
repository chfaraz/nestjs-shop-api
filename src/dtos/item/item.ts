import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class ItemDto {
  @Field()
  title: string;

  @Field()
  detail: string;

  @Field()
  price: number;

  @Field()
  quantity: number;

  @Field(() => ID)
  userId: string;
}
