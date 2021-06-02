import { PassportStrategy } from '@nestjs/passport'
import { Strategy, ExtractJwt } from 'passport-jwt'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { AuthService } from './auth.service'
import { UserService } from 'src/user/user.service'
import { User } from 'src/user/user.type'
import { JwtPayload } from './jwt-payload.interface'


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: '12345',
    })
  }

  async validate(payload: JwtPayload): Promise<User> {
    const user: User = await this.userService.findOne(payload.id)

    if (user) return user

    throw new UnauthorizedException()
  }
}
