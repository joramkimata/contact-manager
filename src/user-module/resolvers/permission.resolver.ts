import { Query, Resolver } from "@nestjs/graphql";
import { Permission } from "../entities/permission.entity";
import { PermissionService } from "../services/permission.service";

@Resolver(of => Permission)
export class PermissionResolver {

    constructor(
        private permissionService: PermissionService
    ) {}

    // Queries
    @Query(returns => [Permission])
    getAllPermissions() {
        return this.permissionService.getAllPermissions();
    }

    @Query(returns => Permission)
    getPermission() {
        return this.permissionService.getPermission();
    }
}