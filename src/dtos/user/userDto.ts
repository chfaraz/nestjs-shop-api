import { Field, InputType } from '@nestjs/graphql';
import { IsString, Length } from 'class-validator';

@InputType()
export class UserDto {
  @Field()
  @IsString()
  @Length(3, 20)
  firstName: string;

  @Field()
  @IsString()
  @Length(3, 20)
  lastName: string;

  @Field()
  @Length(5, 20)
  userName: string;

  @Field()
  @Length(6, 20)
  password: string;

  @Field({ nullable: true })
  items?: string;

  @Field({ defaultValue: false })
  active?: boolean;
}
