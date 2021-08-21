import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class ContactInput {    

    @Field()
    phoneNumber: string;

}