import { BaseEntity } from "src/shared-module/entities/base.entity";
import { Column, Entity, JoinTable, ManyToMany } from "typeorm";
import { Permission } from "./permission.entity";

@Entity('cm_roles')
export class Role extends BaseEntity{

    @Column()
    name: string;

    @Column({ name: 'display_name' })
    displayName: string;

    @Column({ type: 'text' })
    description: string;

    @ManyToMany(type => Permission,)
    @JoinTable({
        name: 'cm_role_permissions',
        joinColumn: { name: 'user_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'role_id', referencedColumnName: 'id' },
    })
    permissions: Permission[];
}