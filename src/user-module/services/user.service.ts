import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { GraphQLError } from "graphql";
import { Repository } from "typeorm";
import { User } from "../entities/user.entity";
import { UserInput } from "../inputs/user.input";

import * as bcrypt from 'bcrypt';
import { AssignRolesInput } from "../inputs/assign-roles.input";


@Injectable()
export class UserService {


    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) { }

    assignRoles(assignRolesInput: AssignRolesInput) {
        throw new Error("Method not implemented.");
    }
    getUsers() {
        throw new Error("Method not implemented.");
    }
    getUser(uuid: string) {
        throw new Error("Method not implemented.");
    }
    deleteUser(uuid: string) {
        throw new Error("Method not implemented.");
    }
    blockUser(uuid: string) {
        throw new Error("Method not implemented.");
    }
    activateUser(uuid: string) {
        throw new Error("Method not implemented.");
    }
    updateUser(fullName: string, username: string) {
        throw new Error("Method not implemented.");
    }

    async createUser(createUserInput: UserInput) {

        const { username, password, confirmPassword } = createUserInput;

        const user = await this.userRepository.findOne({
            where: {
                username,
                deleted: false
            }
        });

        if (user) {
            throw new GraphQLError(`User exists`);
        }

        if (password !== confirmPassword) {
            throw new GraphQLError(`Passwords mismatch`);
        }

        const newUser = this.userRepository.create({
            ...createUserInput,
            password: bcrypt.hashSync(password, 12)
        });

        const savedUsed = await this.userRepository.save(newUser);
        return savedUsed;
    }

}