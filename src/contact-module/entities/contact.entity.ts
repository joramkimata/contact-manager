import { Field, ObjectType } from "@nestjs/graphql";
import { BaseEntity } from "src/shared-module/entities/base.entity";
import { User } from "src/user-module/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";


@Entity('mc_contacts')
@ObjectType()
export class Contact extends BaseEntity {

    @Column({ name: 'phone_number' })
    @Field()
    phoneNumber: string;

    @Field()
    @Column({ name: 'is_public', default: false })
    isPublic: boolean = false;

    @Field(() => User)
    @ManyToOne(() => User, user => user.contacts)
    @JoinColumn({name: 'user_id'})
    user: User;
}