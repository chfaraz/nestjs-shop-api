import { forwardRef, Inject } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { UserDto } from 'src/dtos/user/userDto';
import { ItemService } from 'src/item/item.service';
import { Item } from 'src/item/item.type';
import { UserService } from './user.service';
import { User } from './user.type';

@Resolver((of) => User)
export class UserResolver {
  constructor(private UserService: UserService,
    @Inject(forwardRef(() => ItemService))
    private ItemService: ItemService,
  ) { }

  @Query(() => [User])
  User() {
    return this.UserService.findAll();
  }

  @Query(() => User)
  oneUser(@Args('id') id: string) {
    return this.UserService.findOne(id);
  }

  @Mutation(() => String)
  createUser(@Args('UserDto') createUserDto: UserDto) {
    return this.UserService.signUp(createUserDto);
  }

  @ResolveField(() => [Item])
  async item(@Parent() user: User) {
    return this.ItemService.findAllThatMatch(user._id);
  }
}
