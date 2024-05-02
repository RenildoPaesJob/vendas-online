import { IUserRepository } from "../user/user.repository";
import { Injectable } from "@nestjs/common";
import { UserCreatedDTO, UsernameAndEmail, createUserDTO } from "src/dto/user/users.dto";
import { PrismaService } from "src/infra/database/prisma.database";

@Injectable()
export class UserPrismaRepositor implements IUserRepository {

	constructor(
		private prisma: PrismaService
	) { }

	async findByusername(username: string): Promise<UserCreatedDTO> {
		return await this.prisma.user.findUnique({
			where: {
				username
			}
		})
	}

	async findByUsernameOrEmail(data: UsernameAndEmail): Promise<UserCreatedDTO> {
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

	async findById(id: string): Promise<UserCreatedDTO> {
		return this.prisma.user.findUnique({
			where: {
				id
			}
		})
	}
}