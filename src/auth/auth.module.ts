import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [forwardRef(() => UserModule), PassportModule.register({ defaultStrategy: 'jwt' }),
  JwtModule.register({
    secret: '12345',
    signOptions: { expiresIn: '30d' },
  }),],
  providers: [AuthService, AuthResolver, JwtStrategy],
  exports: [JwtStrategy, PassportModule]
})
export class AuthModule { }
