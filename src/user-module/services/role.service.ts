import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { GraphQLError } from "graphql";
import { Not, Repository } from "typeorm";
import { Permission } from "../entities/permission.entity";
import { Role } from "../entities/role.entity";
import { AssignPermissionInput } from "../inputs/assign-permissions.input";
import { RoleInput } from "../inputs/role.input";

@Injectable()
export class RoleService {

    constructor(
        @InjectRepository(Role)
        private roleRepository: Repository<Role>,
        @InjectRepository(Permission)
        private permissionRepository: Repository<Permission>
    ) { }

    async createRole(createRoleInput: RoleInput) {
        const { description, displayName, name } = createRoleInput;


        const dbRole = await this.roleRepository.findOne({
            name,
            deleted: false,
        });

        if (dbRole) {
            throw new GraphQLError(`Role exists`);
        }

        const role = new Role();
        role.name = name;
        role.displayName = displayName;
        role.description = description;

        return this.roleRepository.save(role);
    }

    getRoles() {
        return this.roleRepository.find({
            deleted: false,
        });
    }

    getRole(uuid: string) {
        return this.roleRepository.findOne({
            uuid,
            deleted: false,
        });
    }

    async assignPermissions(assignPermissionInput: AssignPermissionInput) {
        const { roleUUID, permissionUUIDs } = assignPermissionInput;

        const role = await this.roleRepository.findOne({
            uuid: roleUUID,
            deleted: false
        });

        if (!role) {
            throw new GraphQLError('Role not found');
        }

        let permissions: Permission[] = [];

        try {
            permissions = await this.validatePermissions(permissionUUIDs);

        } catch (err) {
            throw new GraphQLError(`${err}`);
        }

        if (permissions.length > 0) {
            // delete assigned permissions
            await this.deleteRolePermissions(role.id);

            // re-populate new ones
            role.permissions = permissions;
        }


        return this.roleRepository.save(role);
    }

    deleteRolePermissions(id: number) {
        return this.roleRepository.query(`delete from cm_role_permissions where role_id=${id}`);
    }

    validatePermissions(permissionUUIDs: string[]): Permission[] | PromiseLike<Permission[]> {
        const promise: Promise<Permission[]> = new Promise(async (resolve, reject) => {
            const permissions = permissionUUIDs.map(async ruuid => {
                const permission = await this.permissionRepository.findOne({
                    uuid: ruuid,
                    deleted: false,
                });
                if (!permission) {
                    reject(`Permission: ${ruuid} not found`);
                }

                return permission;
            });

            const mpermissions = await Promise.all(permissions);

            resolve(mpermissions);
        });

        return promise;
    }

    async deleteRole(uuid: string) {
        const mRole = await this.roleRepository.findOne({
            uuid,
            deleted: false,
        });

        if (!mRole) {
            throw new GraphQLError(`Role not found`);
        }

        mRole.deleted = true;

        return this.roleRepository.save(mRole);
    }

    async updateRole(uuid: string, updateRoleInput: RoleInput) {
        const { description, displayName, name } = updateRoleInput;

        const mRole = await this.roleRepository.findOne({
            uuid,
            deleted: false,
        });

        if (!mRole) {
            throw new GraphQLError(`Role not found`);
        }

        const dbRole = await this.roleRepository.findOne({
            name,
            deleted: false,
            id: Not(mRole.id)
        });

        if (dbRole) {
            throw new GraphQLError(`Role exists`);
        }

        mRole.name = name;
        mRole.displayName = displayName;
        mRole.description = description;

        return this.roleRepository.save(mRole);
    }
}