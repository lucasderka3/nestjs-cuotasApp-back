import { Cuota } from "src/cuotas/entities/cuota.entity";
import { Column, Entity, ManyToOne } from "typeorm";

@Entity()
export class Pago {

    @Column({primary: true, generated:true})
    id: number;

    @ManyToOne(() => Cuota, (cuota) => cuota.pagos, {eager: true})
    cuota: Cuota;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    fecha: Date;

    @Column('decimal', { precision: 10, scale: 2 })
    monto: number;

    @Column()
    metodoPago: string;

    @Column({ type: 'text', nullable: true })
    observaciones: string;
}
