import { Module } from "@nestjs/common"
import { UserController } from "../../controllers/users/user.controller"
import { createUser } from "src/services/users/createUser.service"
import { PrismaService } from "src/infra/database/prisma.service"
import { IUserRepository } from "src/repositories/user/user.repository"
import { UserPrismaRepositor } from "src/repositories/prisma/user.prisma.repository"

@Module({
    controllers: [UserController],
    providers  : [
			createUser,
			PrismaService,
			{
				provide: IUserRepository,
				useClass: UserPrismaRepositor
			}
		],
    exports    : []
})

export class UserModule {}