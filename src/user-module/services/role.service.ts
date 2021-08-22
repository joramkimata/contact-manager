import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Role } from "../entities/role.entity";
import { AssignPermissionInput } from "../inputs/assign-permissions.input";
import { RoleInput } from "../inputs/role.input";

@Injectable()
export class RoleService {
    
    constructor(
        @InjectRepository(Role)
        private roleRepository: Repository<Role>
    ) {}

    createRole(createRoleInput: RoleInput) {
        throw new Error("Method not implemented.");
    }

    getRoles() {
        throw new Error("Method not implemented.");
    }
    getRole(uuid: string) {
        throw new Error("Method not implemented.");
    }
    assignPermissions(assignPermissionInput: AssignPermissionInput) {
        throw new Error("Method not implemented.");
    }
    deleteRole(uuid: string) {
        throw new Error("Method not implemented.");
    }
    updateRole(uuid: string, updateRoleInput: RoleInput) {
        throw new Error("Method not implemented.");
    }
}