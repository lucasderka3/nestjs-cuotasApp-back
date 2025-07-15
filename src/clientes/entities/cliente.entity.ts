import { Cuota } from "src/cuotas/entities/cuota.entity";
import { Column, Entity, OneToMany } from "typeorm";


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

    @Column( {type: 'date'} )
    fecha_alta: Date;
    
    @Column( {default: true} )
    activo: Boolean;

    @OneToMany(() => Cuota, (cuota) => cuota.cliente)
    cuotas: Cuota[];

}
