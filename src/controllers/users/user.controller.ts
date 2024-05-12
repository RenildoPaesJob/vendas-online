import { Body, Controller, Get, Post, Put, Request, UploadedFile, UseGuards, UseInterceptors, UsePipes } from "@nestjs/common"
import { FileInterceptor } from "@nestjs/platform-express";
import { createUser } from '../../services/users/createUser.service';
import { ProfileUserUserCase } from '../../services/login/profile-user.usecase';
import { UploadAvatarUserUserCase } from '../../services/users/upload-avatar-user.usecase';
import { CreateUserValidationPipe } from '../../modules/users/pipes/create-user.validation.pipe';
import { CreateUserSchema, CreateUserSchemaDTO } from '../../schemas/create-user.schema';
import { CreateUserResponseSchemaDTO } from '../../schemas/create-user.schema';
import { AuthGuard } from '../../infra/providers/auth-guards';
import { FileDTO } from '../../dto/user/users.dto';
import { zodToOpenAPI } from "nestjs-zod";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiResponse, ApiTags } from "@nestjs/swagger";

const schemaUserSwagger = zodToOpenAPI(CreateUserSchema)

@Controller("users")
@ApiTags("users")
export class UserController {
	constructor(
		private readonly createUser: createUser,
		private readonly profileUserUseCase: ProfileUserUserCase,
		private readonly uploadAvatarUserUseCase: UploadAvatarUserUserCase
	) { }

	@Post("/create")// method Http
	@ApiBody({
		description: "Create User",
		schema: schemaUserSwagger
	})//schema nessario para criar um usuario
	@ApiResponse({ status: 201, description: "User create success!" })//tipo de retorno quando requisitado = 201
	@ApiResponse({ status: 400, description: "User already exists!" })//tipo de retorno quando requisitado = 400
	//@UsePipes(new CreateUserValidationPipe)// Pipes => validações e tranformação de dados
	async create(@Body() data: CreateUserSchemaDTO) {
		const user = await this.createUser.execute(data)
		// faz um map para retornar os informação do tipo CreateUserResponseSchemaDTO
		return CreateUserResponseSchemaDTO.parse(user)//safeParse(user)
	}

	@Get("/profile")
	@UseGuards(AuthGuard)// tem o mesmo papel de uma middleware
	@ApiBearerAuth()//ele ja entende que essa rota necessita da autenticaçao do usuario
	async profile(@Request() req) {
		return this.profileUserUseCase.execute(req.user.sub)
	}

	@Put("/avatar/upload")
	@UseInterceptors(FileInterceptor("file"))
	@UseGuards(AuthGuard)//autenticação do usuario para fazer o upload
	@ApiBearerAuth()
	@ApiConsumes("multipart/form-data")
	@ApiBody({//outra forma de definir o schema que este metodo necessita
		schema: {
			type: "object",
			properties: {
				file: {
					type: "string",
					format: "binary"
				}
			}
		}
	})
	async uploadAvatar(
		@Request() req,
		@UploadedFile() file: FileDTO
	) {
		const result = await this.uploadAvatarUserUseCase.execute({
			file,
			idUser: req.user.sub
		})

		return result
	}
}