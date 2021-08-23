import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";


export const GetCurrentUser = createParamDecorator(
    (data: unknown, context: ExecutionContext) => {

        const ctx = GqlExecutionContext.create(context);
        const { req } = ctx.getContext();

        return req.user;
    },
);