import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { LoginDto } from "../dto/login.dto";
import { AuthService } from "../services/auth.service";

export class JwtPayload {
    username: string;
    password: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private authService: AuthService
    ) {

        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'qwerty.2021',
        });

    }

    async validate(payload: JwtPayload) {
        const { username, password } = payload;

        const loginDto = new LoginDto();
        loginDto.username = username;
        loginDto.password = password;

        const user = await this.authService.login(loginDto);

        if (!user) {
            throw new UnauthorizedException('Invalid User');
        }

        return user;
    }
}