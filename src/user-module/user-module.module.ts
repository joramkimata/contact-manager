import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { User } from './entities/user.entity';
import { RoleResolver } from './resolvers/role.resolver';
import { UserResolver } from './resolvers/user.resolver';
import { RoleService } from './services/role.service';
import { UserService } from './services/user.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            User,
            Role
        ])
    ],
    providers: [
        UserResolver,
        UserService,
        RoleService,
        RoleResolver
    ]
})
export class UserModuleModule {}
