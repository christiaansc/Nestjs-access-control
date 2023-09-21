import { Column, CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';


export class Base {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid();

    @CreateDateColumn({ type: 'timestamp' }) // Fecha de creación
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' }) // Fecha de actualización
    updatedAt: Date;


    @Column({ nullable: true, select: false }) // Usuario creador
    createdBy: string | null;

    @DeleteDateColumn({ select: false })
    deletedAt?: Date;

}