import { UseGuards } from "@nestjs/common";
import { Args, Query, Resolver } from "@nestjs/graphql";
import { PermissionGuard } from "src/auth-module/guards/permission.guard";
import { GroupName, HasPermission } from "../decorators/has-permission.decorator";
import { Permission } from "../entities/permission.entity";
import { PermissionService } from "../services/permission.service";

@Resolver(of => Permission)
@HasPermission({
    name: 'ROLE_VIEW_PERMISSIONS',
    displayName: 'Can View Permissions',
    groupName: GroupName.UAA,
    description: 'Can View Permissions'
})
@UseGuards(PermissionGuard)
export class PermissionResolver {

    constructor(
        private permissionService: PermissionService
    ) { }

    // Queries
    @Query(returns => [Permission])
    getAllPermissions() {
        return this.permissionService.getAllPermissions();
    }

    @HasPermission({
        name: 'ROLE_VIEW_PERMISSION',
        displayName: 'Can View Permission',
        groupName: GroupName.UAA,
        description: 'Can View Permission'
    })
    @Query(returns => Permission)
    getPermission() {
        return this.permissionService.getPermission();
    }

    @HasPermission({
        name: 'ROLE_VIEW_PERMISSIONS_BY_GROUP_NAME',
        displayName: 'Can View Permissions By Group Name',
        groupName: GroupName.UAA,
        description: 'Can View Permissions By Group Name'
    })
    @Query(returns => [Permission])
    getPermissionByGroupName(
        @Args('groupName', { type: () => GroupName }) groupName: GroupName
    ) {
        return this.permissionService.getPermissionByGroupName(groupName);
    }
}