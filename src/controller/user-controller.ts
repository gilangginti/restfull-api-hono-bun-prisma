import { Context } from "hono";
import { RegisterUserRequest } from "../model/user-model";
import { userService } from "../service/user-service";


export class userController{
    static async getUsers(c: Context) {
        return c.json({ message: 'Hello, World!' });
    }
    static async registerUser(c: Context){
        const request = await c.req.json() as RegisterUserRequest;
        const response = await userService.registerUser(request);

        c.status(201);
        return c.json({
            message: 'User Registered Successfully',
            data: response,
        });
    }
}