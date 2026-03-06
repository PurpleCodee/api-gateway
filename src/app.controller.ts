import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AppService} from './app.service';
import { AuthGuard } from '@nestjs/passport';
@Controller()
export class AppController{
  constructor(private readonly gw: AppService) {}
  // Public endpoints forwarded to auth-service
  // Este endpoint se encarga de recibir la solicitud de login del cliente,
  // enviar la solicitud al auth-service a través del servicio y devolver la respuesta al cliente
  @Post('auth/login')
  login(@Body() body: { username: string; password: string }) {
    return this.gw.login(body);
  }
  // Protected endpoint at the gateway (example)
  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  profile(@Req() req: any) {
    return { message: 'Hello from Gateway', user: req.user };
  }
}
