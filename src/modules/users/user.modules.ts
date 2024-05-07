import { Module } from "@nestjs/common"
import { UserController } from "../../controllers/users/user.controller"
import { createUser } from "src/services/users/createUser.service"
import { IUserRepository } from "src/repositories/user/user.repository"
import { PrismaService } from "src/infra/database/prisma.database"
import { ProfileUserUserCase } from "src/services/login/profile-user.usecase"
import { UserPrismaRepositor } from "src/repositories/prisma/user.prisma"
import { UploadAvatarUserUserCase } from "src/services/users/upload-avatar-user.usecase"
import { IStorage } from "src/infra/providers/storage/storage"
import { SupabaseStorage } from "src/infra/providers/storage/supabase.storage"

@Module({
	controllers: [UserController],
	providers: [
		createUser,
		ProfileUserUserCase,
		UploadAvatarUserUserCase,
		PrismaService,
		{
			provide: IUserRepository,
			useClass: UserPrismaRepositor
		},
		{
			provide: IStorage,
			useClass: SupabaseStorage
		}
	],
	exports: []
})

export class UserModule { }