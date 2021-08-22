import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Role } from "../entities/role.entity";
import { AssignPermissionInput } from "../inputs/assign-permissions.input";
import { RoleInput } from "../inputs/role.input";
import { RoleService } from "../services/role.service";


@Resolver(of => Role)
export class RoleResolver {

    constructor(
        private roleService: RoleService
    ) {}

    @Mutation(returns => Role)
    createRole(
        @Args('createRoleInput') createRoleInput: RoleInput
    ) {
        return this.roleService.createRole(createRoleInput);
    }

    @Mutation(returns => Role)
    updateRole(
        @Args('uuid') uuid: string,
        @Args('updateRoleInput') updateRoleInput: RoleInput
    ) {
        return this.roleService.updateRole(uuid, updateRoleInput);
    }

    @Mutation(returns => Role)
    deleteRole(
        @Args('uuid') uuid: string,
    ) {
        return this.roleService.deleteRole(uuid);
    }

    @Mutation(returns => Role)
    assignPermissions(
        @Args('assignPermissionInput') assignPermissionInput: AssignPermissionInput
    ) {
        return this.roleService.assignPermissions(assignPermissionInput);
    }

    // Queries

    @Query(returns => Role)
    getRole(
        @Args('uuid') uuid: string
    ) {
        return this.roleService.getRole(uuid);
    }

    @Query(returns => [Role])
    getRoles() {
        return this.roleService.getRoles();
    }


}