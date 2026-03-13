import { Controller, Get, Post, Patch, Param, Body, Query, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { DebtorService } from './debtor.service';

@Controller('debtors')
@UseGuards(AuthGuard('jwt'))
export class DebtorController {
  constructor(private readonly debtorService: DebtorService) {}

  // End point de paginacion y busqueda
  @Get('search')
  search(@Query() query, @Req() req: any) {
    return this.debtorService.findAllPaginated(query, req.user.userId);
  }

  // End point traer un debtor por su id
  @Get(':id')
  findOne(@Param('id') id: number, @Req() req: any) {
    return this.debtorService.findOne(id, req.user.userId);
  }

  // End point para crear un nuevo debtor
  @Post()
  create(@Body() body: any, @Req() req: any) {
    return this.debtorService.create(body, req.user.userId);
  }

  // End point para actualizar un debtor
  @Patch(':id')
  update(@Param('id') id: number, @Body() body: any, @Req() req: any) {
    return this.debtorService.update(id, body, req.user.userId);
  }
}
