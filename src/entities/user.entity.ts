import { Column, Entity } from 'typeorm';
import { Base } from './_base/base'
import { Role } from 'src/shared/emuns/roles.enum';


@Entity({ name: 'user' })
export class User extends Base {

    @Column({ nullable: true })
    name: string
    @Column({ nullable: false })
    email: string
    @Column({ nullable: false, select: false })
    password: string

    @Column({ type: 'enum', default: Role.USER, enum: Role })
    role: string

}
