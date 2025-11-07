import { Controller, Get, Query, HttpException, HttpStatus } from '@nestjs/common';
import { RemitosService } from './remitos.service';
import { SearchRemitosDto } from './dto/search-remitos.dto';
import { QueryFailedError } from 'typeorm';


@Controller('remitos')
export class RemitosController {
  constructor(private readonly remitosService: RemitosService) {}

  // GET /remitos?razon=...&clienteId=...&numeroRemito=...&desde=...&hasta=...
  @Get()
  async search(@Query() query: SearchRemitosDto) {
    // query is already validated/transformed by ValidationPipe (main.ts)
    try {
      const results = await this.remitosService.search(query as any);
      return results;
    } catch (err: any) {
      // detect SQL Server 'Invalid object name' and return a helpful error
      if (err instanceof QueryFailedError || (err && err.message && err.message.includes('Invalid object name'))) {
        const tbl = process.env.REMITOS_TABLE_NAME || 'remitos';
        const schema = process.env.REMITOS_SCHEMA || 'dbo';
        throw new HttpException(
          `Database error: table '${schema}.${tbl}' not found. Please verify the REMITOS_TABLE_NAME and REMITOS_SCHEMA environment variables and that the table exists. Original: ${err.message}`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      throw new HttpException(err?.message || 'Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
