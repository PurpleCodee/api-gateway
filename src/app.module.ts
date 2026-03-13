import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule } from '@nestjs/axios/dist/http.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config/dist/config.module';
import { DebtorModule } from './debtor/debtor.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), AuthModule, HttpModule, DebtorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
