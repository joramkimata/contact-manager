import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import { AuthUserService } from "src/user-module/services/auth-user.service";
import { LoginDto } from "../dto/login.dto";


@Injectable()
export class AuthService {

    constructor(
        private authUserService: AuthUserService,
        private jwtService: JwtService
    ) {}

    async login(login: LoginDto) {
        const user = await this.authUserService.login(login.username, login.password);

        if(user == null) {
            return new UnauthorizedException(`Invalid user found`);
        }

        const token = await this.jwtService.signAsync({
            userId: user.id
        });

        return {
            token,
        };
        
    }

}