import { HttpException, HttpStatus, Injectable } from "@nestjs/common"
import { PrismaService } from "src/infra/database/prisma.service"
import { createUserDTO } from "./users.dto"
import { hash } from "bcrypt"

@Injectable()
export class createUser {

	constructor(private prisma: PrismaService) { }

	async execute(data: createUserDTO) {
		const user = await this.prisma.user.findFirst({
			where: {
				OR: [
					{ username: data.username },
					{ email: data.email }
				]
			}
		})

		if (user) throw new HttpException("User already exists!", HttpStatus.BAD_REQUEST)

		const passwordHashed = await hash(data.password, 10)

		return await this.prisma.user.create({
			data: {
				...data,
				password: passwordHashed
			}
		})
	}
}