import { Resolver, Query, Args, Mutation } from "@nestjs/graphql";
import { User } from "../entities/user.entity";
import { AssignRolesInput } from "../inputs/assign-roles.input";
import { UserInput } from "../inputs/user.input";
import { UserService } from "../services/user.service";


@Resolver(of => User)
export class UserResolver {

    constructor(
        private userService: UserService
    ) {}

    // Mutation
    @Mutation(returns => User)
    createUser(
        @Args('createUserInput') createUserInput: UserInput
    ) {
        return this.userService.createUser(createUserInput);
    }

    @Mutation(returns => User)
    updateUser(
        @Args('fullName') fullName: string,
        @Args('username') username: string
    ) {
        return this.userService.updateUser(fullName, username);
    }

    @Mutation(returns => User)
    activateUser(
        @Args('uuid') uuid: string
    ) {
        return this.userService.activateUser(uuid);
    }

    @Mutation(returns => User)
    blockUser(
        @Args('uuid') uuid: string
    ) {
        return this.userService.blockUser(uuid);
    }

    @Mutation(returns => User)
    deleteUser(
        @Args('uuid') uuid: string
    ) {
        return this.userService.deleteUser(uuid);
    }

    @Mutation(returns => User)
    assignRoles(
        @Args('assignRolesInput') assignRolesInput: AssignRolesInput
    ) {
        return this.userService.assignRoles(assignRolesInput);
    }


    // Queries

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