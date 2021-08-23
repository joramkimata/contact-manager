import { Logger } from "@nestjs/common";
import { Injectable, CanActivate,ExecutionContext, UnauthorizedException, ForbiddenException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { GqlExecutionContext } from "@nestjs/graphql";
import { JwtService } from "@nestjs/jwt";

import { PermissionFields } from "../decorators/has-permission.decorator";
import { User } from "../entities/user.entity";
import { UserService } from "../services/user.service";


@Injectable()
export class PermissionGuard implements CanActivate {

    private logger: Logger = new Logger(PermissionGuard.name);

    constructor(private reflector: Reflector, private jwtService: JwtService,
        private userService: UserService) { }

    async canActivate(
        context: ExecutionContext,
    ) {


        const ctx = GqlExecutionContext.create(context);
        const { req } = ctx.getContext();

        const user: User = req.user;

        if (!user) {
            throw new UnauthorizedException('Invalid User');
        }

    
        const accessMethod: PermissionFields = this.reflector.get<PermissionFields>('access', ctx.getHandler());
        const accessClass: PermissionFields = this.reflector.get<PermissionFields>('access', ctx.getClass());

        if (accessClass) {
            const permsArray = await this.userService.getUserPermissions(user.username);
            if (permsArray.some(p => p === accessClass.name)) {
                return true;
            } else {
                throw new ForbiddenException('Access Denied');
            }
        }

        if (accessMethod) {
            const permsArray = await this.userService.getUserPermissions(user.username);
            if (permsArray.some(p => p === accessMethod.name)) {
                return true;
            } else {
                throw new ForbiddenException('Access Denied');
            }
        }

        return true;
    }
}