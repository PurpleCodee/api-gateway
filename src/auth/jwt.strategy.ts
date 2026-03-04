import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(cfg: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

      secretOrKey: cfg.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: any) {
    // Keep it simple: trust payload, optionally call auth-service to verify user still exists

    return { id: payload.sub, email: payload.email, roles: payload.roles };
  }
}
