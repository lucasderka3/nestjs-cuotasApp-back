import { Cliente } from "src/clientes/entities/cliente.entity";
import { Pago } from "src/pagos/entities/pago.entity";
import { Plan } from "src/planes/entities/plan.entity";
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Cuota {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Cliente, (cliente) => cliente.cuotas, {eager: true})
    cliente: Cliente;

    @ManyToOne(() => Plan, (plan) => plan.cuotas, {eager: true})
    plan: Plan;

    @Column( {type: 'date'} )
    fechaInicio: Date;

    @Column( {type: 'date'})
    fechaFin: Date;

    @Column('decimal', { precision: 10, scale: 2 })
    monto: number;

    @Column({ default: false })
    pagada: boolean;

    @Column({ type: 'date', nullable: true })
    fechaPago: Date;

    @Column({ type: 'text', nullable: true })
    observaciones: string;

    @OneToMany(() => Pago, (pago) => pago.cuota)
    pagos: Pago[];
}
