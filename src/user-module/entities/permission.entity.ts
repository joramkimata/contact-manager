import { BaseEntity } from "src/shared-module/entities/base.entity";
import { Column, Entity } from "typeorm";


@Entity('cm_permissions')
export class Permission extends BaseEntity {

    @Column()
    name: string;

    @Column({name: 'display_name'})
    displayName: string;

    @Column({type: 'text'})
    desciption: string;

}