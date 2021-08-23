import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "../entities/user.entity";

import * as bcrypt from 'bcrypt';
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class AuthUserService {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {}

    async login(username: string, password: string): Promise<User | null> {
        

        const user = await this.userRepository.findOne({
            username
        });

        if(!user) {
            return null;
        }

        if(user.active === false) {
            return null;
        }

        const dbPassword = user.password;

        if(bcrypt.compareSync(password, dbPassword) === false) {
            return null;
        }

        return user;
    }
}