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

    

    async getUserPermissions(username: string): Promise<string[]> {
        const query = `SELECT pm.name  FROM cm_users u
        INNER JOIN  cm_user_roles ru ON ru.user_id=u.id
        INNER JOIN cm_role_permissions pr ON pr.role_id=ru.role_id
        INNER JOIN cm_permissions pm ON pm.id=pr.permission_id
        WHERE u.username='${username}' GROUP BY pm.name,u.username`;

        const perms = await this.userRepository.query(query);

        const permsArray = perms.map((p) => p.name);

        return permsArray;
    }

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

    async seedAdmin() {
        const user = await this.userRepository.findOne({
            where: {
                username: 'admin',
                deleted: false
            }
        });

        if (!user) {
            const admin = new User();
            admin.fullName = "Joe Doe";
            admin.username = "admin";
            admin.password = bcrypt.hashSync('admin.2021', 10);
            admin.active = true;

            await this.userRepository.save(admin);
        }
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