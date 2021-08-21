import { Field, ObjectType } from "@nestjs/graphql";
import { BaseEntity } from "src/shared-module/entities/base.entity";
import { Column, Entity, OneToOne } from "typeorm";
import { Contact } from "./contact.entity";

@Entity('mc_addresses')
@ObjectType()
export class Address extends BaseEntity {

    @Column()
    @Field()
    location: string;

    @OneToOne(() => Contact, contact => contact.address)
    @Field(type => Contact)
    contact: Contact;

}