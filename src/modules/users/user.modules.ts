import { Module } from "@nestjs/common"
import { UserController } from "../../controllers/users/user.controller"
import { createUser } from "src/services/users/createUser.service"
import { PrismaService } from "src/infra/database/prisma.service"

@Module({
    controllers: [UserController],
    providers  : [createUser, PrismaService],
    exports    : []
})

export class UserModule {}