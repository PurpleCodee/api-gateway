import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class DebtorService {
  private readonly debtorUrl: string;

  constructor(
    private readonly http: HttpService,
    cfg: ConfigService,
  ) {
    this.debtorUrl = cfg.get<string>('DEBTOR_SERVICE_URL') ?? 'http://localhost:3002';
  }

  // Este metodo sirve para la paginacion y filtro del buscador
  async findAllPaginated(query: any) {
    const res$ = this.http.get(`${this.debtorUrl}/debtors/search`, { params: query });
    return (await firstValueFrom(res$)).data;
  }

  // Este metodo devuelve el debtor por la id
  async findOne(id: number) {
    const res$ = this.http.get(`${this.debtorUrl}/debtors/${id}`);
    return (await firstValueFrom(res$)).data;
  }

  // Este metodo crea un nuevo debtor
  async create(body: any) {
    const res$ = this.http.post(`${this.debtorUrl}/debtors`, body);
    return (await firstValueFrom(res$)).data;
  }

  // Este metodo actualiza cualquier dato necesario del debtor
  async update(id: number, body: any) {
    const res$ = this.http.patch(`${this.debtorUrl}/debtors/${id}`, body);
    return (await firstValueFrom(res$)).data;
  }
}
