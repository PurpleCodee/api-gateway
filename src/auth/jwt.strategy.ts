import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(cfg: ConfigService) {
    super({
      ignoreExpiration: false,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

      secretOrKey: cfg.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: any) {
    const userId = payload?.userId ?? payload?.sub ?? payload?.id ?? payload?.id_user;

    if (!userId) {
      throw new UnauthorizedException('JWT payload does not contain a valid user id');
    }

    return {
      ...payload,
      userId: String(userId),
      username: payload?.username,
    };
  }
}
