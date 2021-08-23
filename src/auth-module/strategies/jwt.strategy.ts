import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { LoginDto } from "../dto/login.dto";
import { AuthService } from "../services/auth.service";

export class JwtPayload {
    userId: number;
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

        const { userId } = payload;

        const user = await this.authService.getUserFromId(userId);

        if (!user) {
            throw new UnauthorizedException('Invalid User');
        }

        return user;
    }
}