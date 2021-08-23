import { DiscoveryModule, DiscoveryService } from '@golevelup/nestjs-discovery';
import { forwardRef, Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModuleModule } from 'src/auth-module/auth-module.module';
import { SharedModuleModule } from 'src/shared-module/shared-module.module';
import { Permission } from './entities/permission.entity';
import { Role } from './entities/role.entity';
import { User } from './entities/user.entity';
import { PermissionResolver } from './resolvers/permission.resolver';
import { RoleResolver } from './resolvers/role.resolver';
import { UserResolver } from './resolvers/user.resolver';
import { PermissionService } from './services/permission.service';
import { RoleService } from './services/role.service';
import { UserService } from './services/user.service';

@Module({
    imports: [
        forwardRef(() => AuthModuleModule),
        DiscoveryModule,
        TypeOrmModule.forFeature([
            User,
            Role,
            Permission
        ]),
    ],
    providers: [
        UserResolver,
        UserService,
        RoleService,
        RoleResolver,
        PermissionService,
        PermissionResolver,
    ],
    exports: [
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
