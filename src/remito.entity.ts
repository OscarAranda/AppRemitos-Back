import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

const REMITOS_TABLE = process.env.REMITOS_TABLE_NAME ;
const REMITOS_SCHEMA = process.env.REMITOS_SCHEMA;

@Entity({ name: REMITOS_TABLE, schema: REMITOS_SCHEMA })
export class Remito {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'numero_remito', nullable: true })
  numeroRemito: string;

  @Column({ name: 'id_cliente', nullable: true })
  clienteId: string;

  @Column({ name: 'razon_social', nullable: true })
  razonSocial: string;

  @Column({ type: 'datetime', name: 'fecha', nullable: true })
  fecha: Date;

  @Column({ name: 'link_remito', nullable: true })
  linkRemito: string;
}
