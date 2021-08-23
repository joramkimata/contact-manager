import { Body, Controller, Post } from "@nestjs/common";
import { LoginDto } from "../dto/login.dto";
import { AuthService } from "../services/auth.service";


@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService
    ) {}

    @Post('login')
    login(@Body() login: LoginDto) {
        return this.authService.login(login);
    }
}