import { forwardRef, Inject, UseGuards } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { ItemDto } from 'src/dtos/item/item';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/user.type';
import { ItemService } from './item.service';
import { Item } from './item.type';

@Resolver((of) => Item)
export class ItemResolver {
  constructor(private itemService: ItemService,
    @Inject(forwardRef(() => UserService))
    private userService: UserService,) { }

  @Query(() => [Item])
  item() {
    return this.itemService.findAll();
  }

  @Query(() => Item)
  oneItem(@Args('id') id: string) {
    return this.itemService.findOne(id);
  }

  @Mutation(() => Item)
  @UseGuards(AuthGuard())
  createItem(@Args('ItemDto') createItemDto: ItemDto) {
    return this.itemService.create(createItemDto);
  }

  @Mutation(() => Item)
  update(@Args('ItemDto') createItemDto: ItemDto, @Args('id') id: string) {
    return this.itemService.update(id, createItemDto);
  }

  @Mutation((returns) => String!, { nullable: true })
  delete(@Args('id') id: string) {
    return this.itemService.delete(id);
  }

  @ResolveField(() => User)
  async user(@Parent() item: Item) {
    return this.userService.findOne(item.userId.toString());
  }
}
