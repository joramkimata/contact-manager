import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { GraphQLError } from "graphql";
import { Repository } from "typeorm";
import { User } from "../entities/user.entity";
import { UserInput } from "../inputs/user.input";

import * as bcrypt from 'bcrypt';
import { AssignRolesInput } from "../inputs/assign-roles.input";
import { Role } from "../entities/role.entity";



@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Role)
        private roleRepository: Repository<Role>,
    ) { }


    async assignRoles(assignRolesInput: AssignRolesInput) {
        const { roleUUIDs, userUUID: uuid } = assignRolesInput;

        const user = await this.userRepository.findOne({
            uuid,
            deleted: false
        });

        if (!user) {
            throw new GraphQLError('User not found');
        }
        let roles: Role[] = [];
        try {
            roles = await this.validateRoles(roleUUIDs);
            
        } catch (err) {
            throw new GraphQLError(`${err}`);
        }

        if (roles.length > 0) {
            // delete assigned roles
            await this.deleteUserRoles(user.id);

            // re-populate new ones
            user.roles = roles;
        }


        return this.userRepository.save(user);
    }

    deleteUserRoles(id: number) {
        return this.userRepository.query(`delete from cm_user_roles where user_id=${id}`);
    }

    validateRoles(roleUUIDs: string[]) {
        const promise: Promise<Role[]> = new Promise(async (resolve, reject) => {
            const roles = roleUUIDs.map(async ruuid => {
                const role = await this.roleRepository.findOne({
                    uuid: ruuid,
                    deleted: false,
                });
                if (!role) {
                    reject(`Role: ${ruuid} not found`);
                }

                return role;
            });

            const mroles = await Promise.all(roles);

            resolve(mroles);
        });

        return promise;
    }

    getUsers() {
        return this.userRepository.find({
            where: {
                deleted: false
            },
            relations: ['roles']
        });
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