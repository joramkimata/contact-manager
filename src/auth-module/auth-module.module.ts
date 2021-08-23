import { Module } from '@nestjs/common';
import { UserModuleModule } from 'src/user-module/user-module.module';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { PassportModule } from '@nestjs/passport';

import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
        PassportModule.register({
            defaultStrategy: 'jwt'
        }),
        JwtModule.register({
            secret: 'qwert.2021',
            signOptions: {
                expiresIn: 3600
            }
        }),
        UserModuleModule
    ],
    controllers: [
        AuthController
    ],
    providers: [
        AuthService
    ]
})
export class AuthModuleModule {}
