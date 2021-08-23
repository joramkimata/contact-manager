import { Module } from '@nestjs/common';
import { UserModuleModule } from 'src/user-module/user-module.module';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { PassportModule } from '@nestjs/passport';

import { JwtModule, JwtService } from '@nestjs/jwt';
import { PermissionGuard } from './guards/permission.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user-module/entities/user.entity';
import { JwtStrategy } from './strategies/jwt.strategy';
import { GqlAuthGuard } from './guards/gql-auth.guard';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            User
        ]),
        PassportModule.register({
            defaultStrategy: 'jwt'
        }),
        JwtModule.register({
            secret: 'qwerty.2021',
            signOptions: {
                expiresIn: 3600
            }
        }),
    ],
    controllers: [
        AuthController
    ],
    providers: [
        AuthService,
        PermissionGuard,
        GqlAuthGuard,
        JwtStrategy,
    ],
    exports: [
        JwtModule,
        AuthService,
        JwtStrategy,
        GqlAuthGuard
    ]
})
export class AuthModuleModule {}
