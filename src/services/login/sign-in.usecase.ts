import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { compare } from "bcrypt";
import { SingInDTO } from "src/dto/login/sign-in.dto";
import { PrismaService } from "src/infra/database/prisma.database";

@Injectable()
export class SignInUseCase {

	constructor(
		private jwtService: JwtService,
		private prisma: PrismaService
	) { }

	async execute({ username, password }: SingInDTO) {
		// validar se username existe no DB, se não return error
		const user = await this.prisma.user.findFirst({
			where: {
				username
			}
		})

		// se não existir, return error
		if (!user) throw new UnauthorizedException()

		// se sim, validar senha
		const isEqualPassword = await compare(password, user.password)

		// se a senhar não for igual, returno um error
		if (!isEqualPassword) throw new UnauthorizedException()

		const payload = {
			sub: user.id,
			username: user.username
		}

		// gerar o token
		const token = await this.jwtService.signAsync(payload)

		// return o token
		return {
			access_token: token
		}
	}
}