import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/user-module/entities/user.entity";
import { Repository } from "typeorm";
import { LoginDto } from "../dto/login.dto";

import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private jwtService: JwtService
    ) { }


    async getUserPermissions(username: string): Promise<string[]> {
        const query = `SELECT pm.name  FROM cm_users u
        INNER JOIN  cm_user_roles ru ON ru.user_id=u.id
        INNER JOIN cm_role_permissions pr ON pr.role_id=ru.role_id
        INNER JOIN cm_permissions pm ON pm.id=pr.permission_id
        WHERE u.username='${username}' GROUP BY pm.name,u.username`;

        const perms = await this.userRepository.query(query);

        const permsArray = perms.map((p) => p.name);

        return permsArray;
    }

    async login(login: LoginDto) {
        const user = await this.userRepository.findOne({
            username: login.username,
            deleted: false
        });


        if (user == null) {
            return new UnauthorizedException(`Invalid user found`);
        }

        if (!bcrypt.compareSync(login.password, user.password) && user.active) {
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