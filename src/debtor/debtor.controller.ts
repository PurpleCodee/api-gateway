import { Controller, Get, Post, Patch, Param, Body, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { DebtorService } from './debtor.service';

@Controller('debtors')
@UseGuards(AuthGuard('jwt'))
export class DebtorController {
  constructor(private readonly debtorService: DebtorService) {}

  // End point de paginacion y busqueda
  @Get('search')
  search(@Query() query) {
    return this.debtorService.findAllPaginated(query);
  }

  // End point traer un debtor por su id
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.debtorService.findOne(id);
  }

  // End point para crear un nuevo debtor
  @Post()
  create(@Body() body: any) {
    return this.debtorService.create(body);
  }

  // End point para actualizar un debtor
  @Patch(':id')
  update(@Param('id') id: number, @Body() body: any) {
    return this.debtorService.update(id, body);
  }
}
