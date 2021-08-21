import { BaseEntity } from "src/shared-module/entities/base.entity";
import { Column, Entity, OneToOne } from "typeorm";
import { Contact } from "./contact.entity";

@Entity('mc_addresses')
export class Address extends BaseEntity {

    @Column()
    location: string;

    @OneToOne(() => Contact, contact => contact.address)
    contact: Contact;

}