import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { UserModule } from './user/user.module';
import { User } from './user/user.type';
import { ItemModule } from './item/item.module';
import { Item } from './item/item.type';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb+srv://faraz:12345@cluster0.vk5jz.mongodb.net/newshopgql?retryWrites=true&w=majority',
      synchronize: true,
      useUnifiedTopology: true,
      entities: [User, Item],
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    UserModule,
    ItemModule,
    AuthModule,
  ],
})
export class AppModule { }
