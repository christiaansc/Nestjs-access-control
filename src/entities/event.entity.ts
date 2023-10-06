import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { Producer } from "./producer.entity";
import { EventStatus } from "src/shared/emuns/event.enum";
import { Base } from "./_base/base";

@Entity({ name: 'event' })
export class Event extends Base<Event> {
    @Column()
    name: string

    @Column()
    address: string

    @Column()
    eventName: string

    @Column()
    description: string

    @Column({ nullable: true }) // Permite que la imagen sea nula
    imagePath: string

    @Column({ type: 'date' }) // Fecha de inicio
    startDate: Date;

    @Column({ type: 'date' }) // Fecha de termino
    endDate: Date;

    @Column({ type: 'time' }) // Hora de inicio
    startTime: string;

    @Column({ type: 'time' }) // Hora de termino
    endTime: string;

    @Column({ type: "uuid", nullable: false })
    producer_uuid: string

    @ManyToOne(() => Producer, (producer) => producer.events, { eager: true })
    @JoinColumn({ name: 'producer_uuid', referencedColumnName: 'id' })
    producer: Producer

    @Column({ type: 'enum', default: EventStatus.PENDING, enum: EventStatus })
    status: string

}