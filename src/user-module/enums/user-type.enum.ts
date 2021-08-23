import { registerEnumType } from "@nestjs/graphql";


export enum UserType {
    ROOT,
    USER
}

registerEnumType(UserType, {
    name: "UserType"
});