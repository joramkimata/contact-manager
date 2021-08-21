import { BaseEntity } from "src/shared-module/entities/base.entity";
import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { Address } from "./address.entity";

@Entity('mc_contacts')
export class Contact extends BaseEntity {

    @Column({name: 'full_name'})
    fullName: string;

    @Column({name: 'phone_number'})
    phoneNumber: string;

    @OneToOne(() => Address, address => address.contact)
    @JoinColumn({name: 'address_id'})
    address: Address;
}