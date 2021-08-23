import { Field, ObjectType } from "@nestjs/graphql";
import { BaseEntity } from "src/shared-module/entities/base.entity";
import { Column, Entity } from "typeorm";
import { GroupName } from "../decorators/has-permission.decorator";


@Entity('cm_permissions')
@ObjectType()
export class Permission extends BaseEntity {

    @Column()
    @Field()
    name: string;

    @Column({ name: 'display_name' })
    @Field()
    displayName: string;

    @Column({ type: 'text', nullable: true })
    @Field({ nullable: true })
    desciption: string;

    @Column({ name: 'group_name' })
    @Field()
    groupName: GroupName;

}