import { Cuota } from "src/cuotas/entities/cuota.entity";
import { Pago } from "src/pagos/entities/pago.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany } from "typeorm";


@Entity()
export class Cliente {

    @Column({primary: true, generated:true})
    id: number;
    
    @Column()
    nombre: string;

    @Column()
    apellido: string;

    @Column( {unique: true} )
    email: string;

    @Column( {nullable: true} )
    telefono: string;

    @CreateDateColumn( {type: 'timestamp'} )
    fecha_alta: Date;
    
    @Column( {default: true} )
    activo: Boolean;

    @OneToMany(() => Cuota, (cuota) => cuota.cliente)
    cuotas: Cuota[];

    @OneToMany(() => Pago, (pago) => pago.cliente)
    pagos: Pago[]

}
