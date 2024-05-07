import { Body, Controller, Get, Post, Put, Request, UploadedFile, UseGuards, UseInterceptors, UsePipes } from "@nestjs/common"
import { FileInterceptor } from "@nestjs/platform-express";
import { FileDTO } from "src/dto/user/users.dto";
import { AuthGuard } from "src/infra/providers/auth-guards";
import { CreateUserValidationPipe } from "src/modules/users/pipes/create-user.validation.pipe";
import { CreateUserResponseSchemaDTO, CreateUserSchemaDTO } from "src/schemas/create-user.schema";
import { ProfileUserUserCase } from "src/services/login/profile-user.usecase";
import { createUser } from "src/services/users/createUser.service";
import { UploadAvatarUserUserCase } from "src/services/users/upload-avatar-user.usecase";

@Controller("users")
export class UserController {
	constructor(
		private readonly createUser: createUser,
		private readonly profileUserUseCase: ProfileUserUserCase,
		private readonly uploadAvatarUserUseCase: UploadAvatarUserUserCase
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

	@Put("/avatar/upload")
	@UseInterceptors(FileInterceptor("file"))
	@UseGuards(AuthGuard)
	async uploadAvatar(
		@Request() req,
		@UploadedFile() file: FileDTO
	){
		const result = await this.uploadAvatarUserUseCase.execute({
			file,
			idUser: req.user.sub
		})

		return result
	}
}