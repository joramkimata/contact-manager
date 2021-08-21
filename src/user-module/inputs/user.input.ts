import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class UserInput {

    @Field()
    fullName: string;

    @Field()
    username: string;

    @Field()
    password: string;

    @Field()
    confirmPassword: string;
    
}