import { Body, Controller, Get, Post, Request, UseGuards, UsePipes } from "@nestjs/common"
import { createUserDTO } from "src/dto/user/users.dto";
import { AuthGuard } from "src/infra/providers/auth-guards";
import { CreateUserValidationPipe } from "src/modules/users/pipes/create-user.validation.pipe";
import { ProfileUserUserCase } from "src/services/login/profile-user.usecase";
import { createUser } from "src/services/users/createUser.service";


@Controller("users")
export class UserController {
	constructor(
		private readonly createUser: createUser,
		private readonly profileUserUseCase: ProfileUserUserCase
	) { }

	@Get("hello")
	hello(){
		return "Hello, world!"
	}

	@Post("/create")// method Http
	@UsePipes(new CreateUserValidationPipe)// Pipes => validações e tranformação de dados
	async create(@Body() data: createUserDTO)
	{
		return await this.createUser.execute(data)
	}

	@Get("/profile")
	@UseGuards(AuthGuard)
	async profile(@Request() req)
	{
		// console.log('🚀 ~ UserController ~ profile ~ req:', req.user)
		return this.profileUserUseCase.execute(req.user.sub)
	}
}