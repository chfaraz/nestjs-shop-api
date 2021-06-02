import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt'
import { Repository } from 'typeorm';
import { access } from 'fs';
import { User } from './user.type';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,


        private readonly jwtService: JwtService,
    ) { }

    async signIn(userName: string, password: string): Promise<User> {
        const user = await this.userService.signIn(userName, password);
        if (user && (await bcrypt.compare(password, user.password))) {
            const payload: JwtPayload = {
                id: user._id,
                userName: user.userName,
            }
            const assessToken: string = await this.jwtService.sign(payload)
            return { token: assessToken };
        } else {
            throw new UnauthorizedException('not a user!')
        }
    }
}
