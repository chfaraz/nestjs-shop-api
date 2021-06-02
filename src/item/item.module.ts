import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { ItemResolver } from './item.resolver';
import { ItemService } from './item.service';
import { Item } from './item.type';

@Module({
  imports: [TypeOrmModule.forFeature([Item]), forwardRef(() => UserModule), AuthModule],
  providers: [ItemResolver, ItemService],
  exports: [ItemService],
})
export class ItemModule { }
