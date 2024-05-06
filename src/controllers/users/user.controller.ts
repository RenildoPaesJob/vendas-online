import { Body, Controller, Get, Post, Request, UseGuards, UseInterceptors, UsePipes } from "@nestjs/common"
import { FileInterceptor } from "@nestjs/platform-express";
import { AuthGuard } from "src/infra/providers/auth-guards";
import { CreateUserValidationPipe } from "src/modules/users/pipes/create-user.validation.pipe";
import { CreateUserResponseSchemaDTO, CreateUserSchemaDTO } from "src/schemas/create-user.schema";
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
	async create(@Body() data: CreateUserSchemaDTO)
	{
		const user = await this.createUser.execute(data)
		// faz um map para retornar os informação do tipo CreateUserResponseSchemaDTO
		return CreateUserResponseSchemaDTO.parse(user)//safeParse(user)
	}

	@Get("/profile")
	@UseGuards(AuthGuard)// tem o mesmo papel de uma middleware
	async profile(@Request() req)
	{
		return this.profileUserUseCase.execute(req.user.sub)
	}

	@Post("/avatar/upload")
	@UseGuards(AuthGuard)
	@UseInterceptors(FileInterceptor("file"))
	async uploadAvatar(@Request() req, file: Express.Multer.File){
		console.log('🚀 ~ UserController ~ uploadAvatar ~ file:', file)

	}
}