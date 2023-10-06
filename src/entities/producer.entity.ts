import { Column, Entity, JoinColumn, OneToMany } from 'typeorm';
import { Base } from './_base/base';
import { Event } from './event.entity';



@Entity({ name: 'producer' })
export class Producer extends Base<Producer> {
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

    @OneToMany(() => Event, (event) => event.producer, { cascade: true })
    @JoinColumn({ name: 'uuid', referencedColumnName: 'producer_uuid' })
    events: Event[];


}


