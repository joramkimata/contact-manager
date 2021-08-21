import { Field, ObjectType } from "@nestjs/graphql";
import { BaseEntity } from "src/shared-module/entities/base.entity";
import { Column, Entity, JoinColumn, OneToOne } from "typeorm";


@Entity('mc_contacts')
@ObjectType()
export class Contact extends BaseEntity {

    @Column({ name: 'phone_number' })
    @Field()
    phoneNumber: string;

    @Field()
    @Column({ name: 'is_public', default: false })
    isPublic: boolean = false;
}