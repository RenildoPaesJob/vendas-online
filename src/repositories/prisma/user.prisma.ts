import { IUserRepository } from "../user/user.repository";
import { Injectable } from "@nestjs/common";
import { UserCreatedDTO, UsernameAndEmail, createUserDTO } from "src/dto/user/users.dto";
import { PrismaService } from "src/infra/database/prisma.database";

@Injectable()
export class UserPrismaRepositor implements IUserRepository {

	constructor(
		private prisma: PrismaService
	) { }

	async findByusername(username: string): Promise<UserCreatedDTO | null> {
		return await this.prisma.user.findUnique({
			where: {
				username
			}
		})
	}

	async findByUsernameOrEmail(data: UsernameAndEmail): Promise<UserCreatedDTO | null> {
		return await this.prisma.user.findFirst({
			where: {
				OR: [
					{ username: data.username },
					{ email: data.email }
				]
			}
		})
	}

	async save(data: createUserDTO): Promise<UserCreatedDTO> {
		return await this.prisma.user.create({ data })
	}

	async findById(id: string): Promise<UserCreatedDTO | null> {
		return this.prisma.user.findUnique({
			where: {
				id
			}
		})
	}


	async uploadAvatar(id: string, path: string): Promise<void> {
		await this.prisma.user.update({
			data: {
				avatarUrl: path
			},
			where: {
				id
			}
		})
	}
}