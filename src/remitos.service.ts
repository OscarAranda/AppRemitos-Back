import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Remito } from './remito.entity';

export interface RemitoFilters {
  razon?: string;
  clienteId?: string;
  numeroRemito?: string;
  desde?: string; // ISO date string
  hasta?: string; // ISO date string
  page?: number;
  limit?: number;
}

export interface PagedResult<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
}

@Injectable()
export class RemitosService {
  constructor(
    @InjectRepository(Remito)
    private readonly remitoRepo: Repository<Remito>,
  ) {}

  async search(filters: RemitoFilters): Promise<PagedResult<Remito>> {
    const qb = this.remitoRepo.createQueryBuilder('r');

    if (filters.razon) {
      qb.andWhere('r.razonSocial LIKE :razon', { razon: `%${filters.razon}%` });
    }

    if (filters.clienteId) {
      qb.andWhere('r.clienteId = :clienteId', { clienteId: filters.clienteId });
    }

    if (filters.numeroRemito) {
      qb.andWhere('r.numeroRemito = :numeroRemito', { numeroRemito: filters.numeroRemito });
    }

    if (filters.desde) {
      qb.andWhere('r.fecha >= :desde', { desde: filters.desde });
    }

    if (filters.hasta) {
      qb.andWhere('r.fecha <= :hasta', { hasta: filters.hasta });
    }

    qb.orderBy('r.fecha', 'DESC');

    const page = filters.page && filters.page > 0 ? filters.page : 1;
    const limit = filters.limit && filters.limit > 0 ? Math.min(filters.limit, 500) : 50;

    qb.skip((page - 1) * limit).take(limit);

    const [items, total] = await qb.getManyAndCount();

    return { items, total, page, limit };
  }
}
