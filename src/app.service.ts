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
  // Esta funcion se encarga de enviar la solicitud de login al auth-service y devolver
  //  la respuesta al controlador
  async login(body: any) {
    const res$ = this.http.post(`${this.authUrl}/auth/login`, body);
    return (await firstValueFrom(res$)).data;
  }
}