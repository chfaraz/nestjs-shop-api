import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemModule } from 'src/item/item.module';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { User } from './user.type';

@Module({
  imports: [TypeOrmModule.forFeature([User]),
  forwardRef(() => ItemModule),],
  providers: [UserResolver, UserService],
  exports: [UserService],
})
export class UserModule { }
