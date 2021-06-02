import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ItemDto } from 'src/dtos/item/item';
import { Repository } from 'typeorm';
import { Item } from './item.type';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item) private ItemRepository: Repository<Item>,
  ) { }

  async create(CreateItemDto: ItemDto): Promise<Item> {
    const createdItem = this.ItemRepository.create(CreateItemDto);

    return this.ItemRepository.save(createdItem);
  }

  async findAll(): Promise<Item[]> {
    return this.ItemRepository.find();
  }

  async findAllThatMatch(userId: string): Promise<Item[]> {
    return await this.ItemRepository.find({
      where: {
        userId: userId.toString()
      }
    });


  }

  async update(itemId: string, CreateItemDto: ItemDto): Promise<Item> {
    const item = await this.ItemRepository.findOne(itemId);

    return this.ItemRepository.save({
      ...item, // existing fields
      ...CreateItemDto, // updated fields
    });
  }

  async findOne(id: string): Promise<Item> {
    return this.ItemRepository.findOne(id);
  }

  async delete(itemId: string): Promise<any> {
    const item = await this.ItemRepository.findOne(itemId);
    if (!item) {
      return 'not found';
    }

    await this.ItemRepository.delete(itemId);
    return 'deleted successfully';
  }
}
