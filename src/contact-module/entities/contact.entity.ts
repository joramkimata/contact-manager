import { Field, ObjectType } from "@nestjs/graphql";
import { BaseEntity } from "src/shared-module/entities/base.entity";
import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { Address } from "./address.entity";

@Entity('mc_contacts')
@ObjectType()
export class Contact extends BaseEntity {

    @Column({ name: 'full_name' })
    @Field()
    fullName: string;

    @Column({ name: 'phone_number' })
    @Field()
    phoneNumber: string;

    @OneToOne(() => Address, address => address.contact)
    @JoinColumn({ name: 'address_id' })
    @Field(type => Address)
    address: Address;

    @Column({ name: 'is_public', default: false })
    isPublic: boolean = false;
}