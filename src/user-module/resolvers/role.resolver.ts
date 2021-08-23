import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { GqlAuthGuard } from "src/auth-module/guards/gql-auth.guard";
import { PermissionGuard } from "src/auth-module/guards/permission.guard";
import { GroupName, HasPermission } from "../decorators/has-permission.decorator";
import { Role } from "../entities/role.entity";
import { AssignPermissionInput } from "../inputs/assign-permissions.input";
import { RoleInput } from "../inputs/role.input";
import { RoleService } from "../services/role.service";


@Resolver(of => Role)
@HasPermission({
    name: 'ROLE_VIEW_ROLES',
    displayName: 'Can View Roles',
    groupName: GroupName.UAA,
    description: 'Can View Roles'
})
@UseGuards(GqlAuthGuard, PermissionGuard)
export class RoleResolver {

    constructor(
        private roleService: RoleService
    ) { }

    @HasPermission({
        name: 'ROLE_CREATE_ROLES',
        displayName: 'Can Create Roles',
        groupName: GroupName.UAA,
        description: 'Can Create Roles'
    })
    @Mutation(returns => Role)
    createRole(
        @Args('createRoleInput') createRoleInput: RoleInput
    ) {
        return this.roleService.createRole(createRoleInput);
    }

    @HasPermission({
        name: 'ROLE_UPDATE_ROLES',
        displayName: 'Can Update Roles',
        groupName: GroupName.UAA,
        description: 'Can Update Roles'
    })
    @Mutation(returns => Role)
    updateRole(
        @Args('uuid') uuid: string,
        @Args('updateRoleInput') updateRoleInput: RoleInput
    ) {
        return this.roleService.updateRole(uuid, updateRoleInput);
    }

    @HasPermission({
        name: 'ROLE_DELETE_ROLES',
        displayName: 'Can Delete Roles',
        groupName: GroupName.UAA,
        description: 'Can Delete Roles'
    })
    @Mutation(returns => Role)
    deleteRole(
        @Args('uuid') uuid: string,
    ) {
        return this.roleService.deleteRole(uuid);
    }

    @HasPermission({
        name: 'ROLE_ASSIGN_ROLES',
        displayName: 'Can Assign Roles',
        groupName: GroupName.UAA,
        description: 'Can Assign Roles'
    })
    @Mutation(returns => Role)
    assignPermissions(
        @Args('assignPermissionInput') assignPermissionInput: AssignPermissionInput
    ) {
        return this.roleService.assignPermissions(assignPermissionInput);
    }

    // Queries

    @HasPermission({
        name: 'ROLE_VIEW_ROLES',
        displayName: 'Can View Roles',
        groupName: GroupName.UAA,
        description: 'Can View Roles'
    })
    @Query(returns => Role)
    getRole(
        @Args('uuid') uuid: string
    ) {
        return this.roleService.getRole(uuid);
    }

    @HasPermission({
        name: 'ROLE_VIEW_ROLE',
        displayName: 'Can View Role',
        groupName: GroupName.UAA,
        description: 'Can View Role'
    })
    @Query(returns => [Role],)
    getRoles() {
        return this.roleService.getRoles();
    }


}