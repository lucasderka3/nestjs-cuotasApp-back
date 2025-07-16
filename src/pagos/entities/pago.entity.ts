import { Cliente } from "src/clientes/entities/cliente.entity";
import { Cuota } from "src/cuotas/entities/cuota.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Pago {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Cuota, (cuota) => cuota.pagos, {eager: true})
    cuota: Cuota;

    @ManyToOne(() => Cliente, (cliente) => cliente.pagos, {eager: true})
    cliente: Cliente;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    fecha: Date;

    @Column('decimal', { precision: 10, scale: 2 })
    monto: number;

    @Column()
    metodoPago: string;

    @Column({ type: 'text', nullable: true })
    observaciones: string;
}
