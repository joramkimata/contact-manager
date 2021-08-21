import { Field, ObjectType } from "@nestjs/graphql";
import { BaseEntity } from "src/shared-module/entities/base.entity";
import { Column, Entity } from "typeorm";


@Entity('cm_permissions')
@ObjectType()
export class Permission extends BaseEntity {

    @Column()
    @Field()
    name: string;

    @Column({ name: 'display_name' })
    @Field()
    displayName: string;

    @Column({ type: 'text' })
    @Field({ nullable: true })
    desciption: string;

}