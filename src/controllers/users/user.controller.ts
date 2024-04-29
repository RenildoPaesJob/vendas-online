import { Body, Controller, Post, UsePipes } from "@nestjs/common"
import { CreateUserValidationPipe } from "src/modules/users/pipes/create-user.validation.pipe";
import { createUser } from "src/services/users/createUser.service";
import { createUserDTO } from "src/services/users/users.dto";


@Controller("users")
export class UserController {
	constructor(
		private readonly createUser: createUser
	) { }

	@Post()// method Http
	@UsePipes(new CreateUserValidationPipe)// Pipes => validações e tranformação de dados
	async create(@Body() data: createUserDTO) {
		return await this.createUser.execute(data)
	}
}