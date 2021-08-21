import { Resolver, Query, Args, Mutation } from "@nestjs/graphql";
import { User } from "../entities/user.entity";
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


    @Query(returns => User)
    getUser(
        @Args('uuid') uuid: string
    ) {
        return "Hello World";
    }
}