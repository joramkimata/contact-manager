import { Resolver, Query, Args } from "@nestjs/graphql";
import { User } from "../entities/user.entity";


@Resolver(of => User)
export class UserResolver {
    @Query(returns => User)
    getUser(
        @Args('uuid') uuid: string
    ) {
        return "Hello World";
    }
}