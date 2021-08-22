import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Permission } from "../entities/permission.entity";


@Injectable()
export class PermissionService {

    constructor(
        @InjectRepository(Permission)
        private permissionRepository: Repository<Permission>
    ) {}

    getPermission() {
        throw new Error("Method not implemented.");
    }

    getAllPermissions() {
        throw new Error("Method not implemented.");
    }
}