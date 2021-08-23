import { DiscoveryService } from "@golevelup/nestjs-discovery";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { GroupName, PermissionFields } from "../decorators/has-permission.decorator";
import { Permission } from "../entities/permission.entity";


@Injectable()
export class PermissionService {
    

    constructor(
        @InjectRepository(Permission)
        private permissionRepository: Repository<Permission>
    ) { }

    getPermission() {
        throw new Error("Method not implemented.");
    }

    getPermissionByGroupName(groupName: GroupName) {
        return this.permissionRepository.find({
            deleted: false,
            groupName,
        });
    }

    getAllPermissions() {
        return this.permissionRepository.find({
            deleted: false,
        });
    }

    async seedPermissions(discover: DiscoveryService, debug: boolean = false) {
        const allPermissionsFromMethods =
            await discover.providerMethodsWithMetaAtKey<PermissionFields>('access');

        const allPermissionsFromClasses = await discover.providersWithMetaAtKey<PermissionFields>('access');

        const permissionsFromClasses = allPermissionsFromClasses.map(p => p.meta);

        const permissionsFromMethods = allPermissionsFromMethods.map((p) => p.meta);

        permissionsFromMethods.concat(permissionsFromClasses).forEach(async (p) => {
            const permission = new Permission();
            permission.displayName = p.displayName;
            permission.name = p.name;
            permission.groupName = p.groupName;

            const dbPermission = await this.permissionRepository.findOne({
                name: p.name,
                groupName: p.groupName,
                deleted: false
            });

            if (!dbPermission) {
                if (debug) {
                    console.log();
                    console.log(JSON.stringify(permission, null, 4));
                    console.log();
                }
                await this.permissionRepository.save(permission);
            }
            
        });

    }
}