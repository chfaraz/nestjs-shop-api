import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from 'src/dtos/user/userDto';
import { Repository } from 'typeorm';
import { User } from './user.type';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private UserRepository: Repository<User>,

  ) { }

  async signUp(CreateUserDto: UserDto): Promise<String> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(CreateUserDto.password, salt);
    CreateUserDto.password = hashedPassword;

    const createdUser = this.UserRepository.create(CreateUserDto);
    try {
      await this.UserRepository.save(createdUser);
      return "Account Created succeccfully."
    } catch (err) {
      if (err.code === 11000) return `user already exists with user name = ${createdUser.userName}`
      return `some error occured please try again! error = ${err}`
    }
  }
  async signIn(userName: string, password: string): Promise<User> {
    return await this.UserRepository.findOne({ userName });
  }

  async findAll(): Promise<User[]> {
    return this.UserRepository.find();
  }

  async findOne(id: string): Promise<User> {
    return this.UserRepository.findOne(id);
  }
}
