import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Base } from './_base/base';
import { Event } from './event.entity';



@Entity({ name: 'producer' })
export class Producer extends Base {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid();

    @Column()
    rut: string

    @Column()
    name: string

    @Column({ nullable: false })
    address: string
    @Column({ nullable: false })
    region: string
    @Column({ nullable: false })
    comuna: string

    @Column({ nullable: false })
    email: string

    @Column({ nullable: false })
    phone: number

    @OneToMany(() => Event, (event) => event.id)
    events: Event[];

}


