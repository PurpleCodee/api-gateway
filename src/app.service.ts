import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
@Injectable()
export class AppService{
  private readonly authUrl: string;
  constructor(
    private readonly http: HttpService,
    cfg: ConfigService,
  ) {
    this.authUrl = cfg.get<string>('AUTH_SERVICE_URL') ?? 'http://localhost:3001';
  }
  async register(body: any) {
    const res$ = this.http.post(`${this.authUrl}/auth/register`, body);
    return (await firstValueFrom(res$)).data;
  }
  async login(body: any) {
    const res$ = this.http.post(`${this.authUrl}/auth/login`, body);
    return (await firstValueFrom(res$)).data;
  }
}