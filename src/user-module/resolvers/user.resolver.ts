import { UseGuards } from "@nestjs/common";
import { Resolver, Query, Args, Mutation } from "@nestjs/graphql";
import { GqlAuthGuard } from "src/auth-module/guards/gql-auth.guard";
import { PermissionGuard } from "src/auth-module/guards/permission.guard";
import { HasPermission, GroupName } from "../decorators/has-permission.decorator";
import { User } from "../entities/user.entity";
import { AssignRolesInput } from "../inputs/assign-roles.input";
import { UserInput } from "../inputs/user.input";
import { UserService } from "../services/user.service";


@Resolver(of => User)
@HasPermission({
    name: 'ROLE_VIEW_USERS',
    displayName: 'Can View Users',
    groupName: GroupName.UAA,
    description: 'Can View Users'
})
@UseGuards(GqlAuthGuard, PermissionGuard)
export class UserResolver {

    constructor(
        private userService: UserService
    ) {}

    // Mutation
    @HasPermission({
        name: 'ROLE_CREATE_USERS',
        displayName: 'Can Create Users',
        groupName: GroupName.UAA,
        description: 'Can Create Users'
    })
    @Mutation(returns => User)
    createUser(
        @Args('createUserInput') createUserInput: UserInput
    ) {
        return this.userService.createUser(createUserInput);
    }

    @HasPermission({
        name: 'ROLE_UPDATE_USERS',
        displayName: 'Can Update Users',
        groupName: GroupName.UAA,
        description: 'Can Update Users'
    })
    @Mutation(returns => User)
    updateUser(
        @Args('fullName') fullName: string,
        @Args('username') username: string
    ) {
        return this.userService.updateUser(fullName, username);
    }

    @HasPermission({
        name: 'ROLE_ACTIVATE_USERS',
        displayName: 'Can Activate Users',
        groupName: GroupName.UAA,
        description: 'Can Activate Users'
    })
    @Mutation(returns => User)
    activateUser(
        @Args('uuid') uuid: string
    ) {
        return this.userService.activateUser(uuid);
    }

    @HasPermission({
        name: 'ROLE_BLOCK_USERS',
        displayName: 'Can Block Users',
        groupName: GroupName.UAA,
        description: 'Can Block Users'
    })
    @Mutation(returns => User)
    blockUser(
        @Args('uuid') uuid: string
    ) {
        return this.userService.blockUser(uuid);
    }

    @HasPermission({
        name: 'ROLE_DELETE_USERS',
        displayName: 'Can Delete Users',
        groupName: GroupName.UAA,
        description: 'Can Delete Users'
    })
    @Mutation(returns => User)
    deleteUser(
        @Args('uuid') uuid: string
    ) {
        return this.userService.deleteUser(uuid);
    }

    @HasPermission({
        name: 'ROLE_ASSIGN_ROLES',
        displayName: 'Can Assign Roles',
        groupName: GroupName.UAA,
        description: 'Can Assign Roles'
    })
    @Mutation(returns => User)
    assignRoles(
        @Args('assignRolesInput') assignRolesInput: AssignRolesInput
    ) {
        return this.userService.assignRoles(assignRolesInput);
    }


    // Queries

    @HasPermission({
        name: 'ROLE_VIEW_USER',
        displayName: 'Can View User',
        groupName: GroupName.UAA,
        description: 'Can View User'
    })
    @Query(returns => User)
    getUser(
        @Args('uuid') uuid: string
    ) {
        return this.userService.getUser(uuid);
    }

    @Query(returns => [User])
    getUsers() {
        return this.userService.getUsers();
    }
}