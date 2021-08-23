import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { AuthUserService } from "src/user-module/services/auth-user.service";

export class JwtPayload {
    username: string;
    password: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private authUserService: AuthUserService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'qwerty.2021',
        });
    }

    async validate(payload: JwtPayload) {
        const { username, password } = payload;


        const user = await this.authUserService.login(username, password);

        if (!user) {
            throw new UnauthorizedException('Invalid User');
        }

        return user;
    }
}