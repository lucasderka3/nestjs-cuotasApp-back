import { Cuota } from "src/cuotas/entities/cuota.entity";
import { Column, Entity, Generated, OneToMany } from "typeorm";

@Entity()
export class Plan {

    @Column({primary: true, generated:true})
    id: number;

    @Column()
    nombre: string;

    @Column('text', { nullable: true })
    descripcion: string;

    @Column('decimal', { precision: 10, scale: 2})
    precio: number;

    @Column()
    frecuencia_pago: string;

    @Column({default: true})
    activo: boolean;
    

    @OneToMany(() => Cuota, (cuota) => cuota.plan)
    cuotas: Cuota[];
}
