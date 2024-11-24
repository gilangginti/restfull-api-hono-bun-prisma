import {MiddlewareHandler} from "hono";
import { userRepositories } from "../repositories/user-repositories";
import { userService } from "../service/user-service";

export const authMiddleware: MiddlewareHandler = async (c, next) => {
    const token = c.req.header('Authorization') as string;
    const user = await userService.get(token) 
    c.set('user', user);
    await next()
}