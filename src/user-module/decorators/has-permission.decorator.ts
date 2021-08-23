import { SetMetadata } from "@nestjs/common";

export enum GroupName {
    UAA = 'UAA',
    CONTACTS = 'CONTACTS'
}

export interface PermissionFields {
    name: string;
    displayName: string;
    description?: string;
    groupName: GroupName;
}

export const HasPermission = (access: PermissionFields) => SetMetadata('access', access)