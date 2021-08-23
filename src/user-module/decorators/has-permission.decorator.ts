import { SetMetadata } from "@nestjs/common";
import { registerEnumType } from "@nestjs/graphql";

export enum GroupName {
    UAA = 'UAA',
    CONTACTS = 'CONTACTS'
}

registerEnumType(GroupName, {
    name: 'GroupName'
});

export interface PermissionFields {
    name: string;
    displayName: string;
    description?: string;
    groupName: GroupName;
}

export const HasPermission = (access: PermissionFields) => SetMetadata('access', access)