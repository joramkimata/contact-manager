import { BaseEntity } from "src/shared-module/entities/base.entity";
import { Column, Entity, JoinTable, ManyToMany } from "typeorm";
import { Role } from "./role.entity";

@Entity('cm_users')
export class User extends BaseEntity{

    @Column({name: 'full_name'})
    fullName: string;

    @Column()
    username: string;

    @Column()
    password: string;

    @ManyToMany(type => Role,)
    @JoinTable({
        name: 'cm_user_roles',
        joinColumn: { name: 'user_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'role_id', referencedColumnName: 'id' },
    })
    roles: Role[];

    
}