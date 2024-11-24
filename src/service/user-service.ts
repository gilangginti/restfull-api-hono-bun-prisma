import { HTTPException } from "hono/http-exception";
import { RegisterUserRequest } from "../model/user-model";
import { userRepositories } from "../repositories/user-repositories";
import { UserValidation } from "../validation/user-validation";

export class userService {
    static async registerUser(request: RegisterUserRequest) {
        request = UserValidation.REGISTER.parse(request);

        const total = await userRepositories.countTotalUsersWithSameEmail(request.name);

        if (total != 0) {
            throw new HTTPException(400, {
                message: "Username already exists"
            })
        }

        const user = await userRepositories.createUser(request);

        return user;
    }
    static async get(token: string | undefined | null){
        const result = UserValidation.TOKEN.safeParse(token)

        if (result.error) {
            throw new HTTPException(401, {
                message: "Unauthorized"
            })
        }
        token = result.data;
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
        
        if (!uuidRegex.test(token as string)) {
            throw new HTTPException(401, {
                message: "Unauthorized - Invalid Token Format"
            });
        }
        const user = await userRepositories.getUserById(token as string)

        if (!user) {
            throw new HTTPException(401, {
                message: "Unauthorized"
            })
        }

        return user;
    }
}