import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType('token')

export class User {
  @Field()
  token: string;
}
