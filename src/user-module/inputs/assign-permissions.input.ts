import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class AssignPermissionInput {
    
    @Field()
    roleUUID: string;

    @Field(type => [String])
    permissionUUIDs: string[]

}