import { DiscoveryModule, DiscoveryService } from '@golevelup/nestjs-discovery';
import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from './entities/permission.entity';
import { Role } from './entities/role.entity';
import { User } from './entities/user.entity';
import { PermissionResolver } from './resolvers/permission.resolver';
import { RoleResolver } from './resolvers/role.resolver';
import { UserResolver } from './resolvers/user.resolver';
import { AuthUserService } from './services/auth-user.service';
import { PermissionService } from './services/permission.service';
import { RoleService } from './services/role.service';
import { UserService } from './services/user.service';

@Module({
    imports: [
        DiscoveryModule,
        TypeOrmModule.forFeature([
            User,
            Role,
            Permission
        ])
    ],
    providers: [
        UserResolver,
        UserService,
        RoleService,
        RoleResolver,
        PermissionService,
        PermissionResolver,
        AuthUserService
    ],
    exports: [
        AuthUserService
    ]
})
export class UserModuleModule implements OnModuleInit {

    constructor(
        private discoveryService: DiscoveryService,
        private permissionService: PermissionService,
        private userService: UserService
    ) {}

    onModuleInit() {
        this.permissionService.seedPermissions(this.discoveryService);
        this.userService.seedAdmin();
    }
}
