import { prisma } from "../application/dataabse";
import { RegisterUserRequest } from "../model/user-model";

export class userRepositories{
    static async countTotalUsersWithSameEmail(email: string) {
        const response = await prisma.user.count({
            where: {
                email: email
            }
        })
        return response
    }

    static async createUser(request: RegisterUserRequest) {
        const response = await prisma.user.create({
            data: {
                name: request.name,
                email: request.email
            }
        })
        return response
    }
    static async getUserById(id: string){
        console.log("id",id)
        const response = await prisma.user.findUnique({
            where: {
                id
            }
        })
        return response
    }
}