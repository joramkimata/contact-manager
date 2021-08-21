import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { GraphQLError } from "graphql";
import { Repository } from "typeorm";
import { User } from "../entities/user.entity";
import { UserInput } from "../inputs/user.input";


@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {}

    async createUser(createUserInput: UserInput) {

        const { username, password, confirmPassword, fullName } = createUserInput;

        const user = await this.userRepository.findOne({
            where: {
                username,
                deleted: false
            }
        });

        if(user) {
            throw new GraphQLError(`User exists`);
        }

        if(password !== confirmPassword) {
            throw new GraphQLError(`Passwords mismatch`);
        }

        const newUser = new User();

    }

}