import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { GraphQLError } from "graphql";
import { Repository } from "typeorm";
import { User } from "../entities/user.entity";
import { UserInput } from "../inputs/user.input";

import * as bcrypt from 'bcrypt';
import { AssignRolesInput } from "../inputs/assign-roles.input";
import { Role } from "../entities/role.entity";
import { Permission } from "../entities/permission.entity";



@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Role)
        private roleRepository: Repository<Role>,
        @InjectRepository(Permission)
        private permissionRepository: Repository<Permission>,
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
        return this.userRepository.findOne({
            where: {
                deleted: false,
                uuid
            },
            relations: ['roles']
        });
    }

    async deleteUser(uuid: string) {
        const user = await this.userRepository.findOne({
            where: {
                deleted: false,
                uuid
            },
            relations: ['roles']
        });

        if(!user) {
            throw new GraphQLError(`User not found`);
        }

        user.deleted = true;
        return this.userRepository.save(user);
    }

    async blockUser(uuid: string) {
        const user = await this.userRepository.findOne({
            where: {
                deleted: false,
                uuid
            },
            relations: ['roles']
        });

        if (!user) {
            throw new GraphQLError(`User not found`);
        }

        user.active = false;
        return this.userRepository.save(user);
    }

    async activateUser(uuid: string) {
        const user = await this.userRepository.findOne({
            where: {
                deleted: false,
                uuid
            },
            relations: ['roles']
        });

        if (!user) {
            throw new GraphQLError(`User not found`);
        }

        user.active = true;
        return this.userRepository.save(user);
    }

    updateUser(fullName: string, username: string) {
        
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

            const savedAdmin = await this.userRepository.save(admin);

            const role = await this.roleRepository.findOne({
                name: 'ADMIN',
                deleted: false
            });

            if(!role) { 
                const newRole = new Role();
                newRole.name = 'ADMIN';
                newRole.displayName = "Administrator";
                newRole.description = "Administrator";
                const savedRole = await this.roleRepository.save(newRole);

                const permissions = await this.permissionRepository.find({
                    deleted: false
                });

                if(permissions) {
                    savedRole.permissions = permissions;
                    const newlysavedRole = await this.roleRepository.save(savedRole);

                    savedAdmin.roles = [newlysavedRole];

                    await this.userRepository.save(savedAdmin);
                }
            }
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