import { UsernameAndEmail, UserCreatedDTO, createUserDTO } from "src/services/users/users.dto";
import { IUserRepository } from "../user/user.repository";
import { PrismaService } from "src/infra/database/prisma.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UserPrismaRepositor implements IUserRepository {

	constructor(
		private prisma: PrismaService
	) { }

	async findByusername(username: string): Promise<UserCreatedDTO> {
		return await this.prisma.user.findFirst({
			where: {
				username
			}
		})
	}

	async findByUsernameOrEmail(data: UsernameAndEmail): Promise<UserCreatedDTO> {
		return await this.prisma.user.findUnique({
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
}