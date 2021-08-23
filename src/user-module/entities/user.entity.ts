import { ObjectType, Field } from "@nestjs/graphql";
import { Contact } from "src/contact-module/entities/contact.entity";
import { BaseEntity } from "src/shared-module/entities/base.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from "typeorm";
import { UserType } from "../enums/user-type.enum";
import { Role } from "./role.entity";

@Entity('cm_users')
@ObjectType()
export class User extends BaseEntity {

    @Column({ name: 'full_name' })
    @Field()
    fullName: string;

    @Column()
    @Field()
    username: string;

    @Column()
    password: string;

    @Column({ default: false })
    active: boolean = false;

    @Column({ name: 'user_type', default: UserType.USER })
    userType: UserType;

    @Field(type => [Role], { nullable: true })
    @ManyToMany(type => Role,)
    @JoinTable({
        name: 'cm_user_roles',
        joinColumn: { name: 'user_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'role_id', referencedColumnName: 'id' },
    })
    roles: Role[];

    @OneToMany(() => Contact, contact => contact.user)
    contacts: Contact[];


}