import { Module } from "@nestjs/common"
import { UserController } from "../../controllers/users/user.controller"
import { createUser } from "src/services/users/createUser.service"
import { IUserRepository } from "src/repositories/user/user.repository"
import { UserPrismaRepositor } from "src/repositories/prisma/user.prisma.repository"
import { PrismaService } from "src/infra/database/prisma.database"
import { ProfileUserUserCase } from "src/services/login/profile-user.usecase"

@Module({
	controllers: [UserController],
	providers: [
		createUser,
		ProfileUserUserCase,
		PrismaService,
		{
			provide: IUserRepository,
			useClass: UserPrismaRepositor
		}
	],
	exports: []
})

export class UserModule { }