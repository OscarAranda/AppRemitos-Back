import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Remito } from './remito.entity';
import { RemitosService } from './remitos.service';
import { RemitosController } from './remitos.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: process.env.DB_HOST || 'localhost',
      port: +(process.env.DB_PORT || 1433),
      username: process.env.DB_USERNAME || 'sa',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_DATABASE || 'remitosdb',
      entities: [Remito],
      synchronize: process.env.TYPEORM_SYNCHRONIZE === 'true' || false, // enable only for dev via env var
      options: {
        enableArithAbort: true,
        trustServerCertificate: true,
      },
    }),
    TypeOrmModule.forFeature([Remito]),
  ],
  controllers: [AppController, RemitosController],
  providers: [AppService, RemitosService],
})
export class AppModule {}
