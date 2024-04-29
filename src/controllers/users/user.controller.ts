import { Body, Controller, HttpException, HttpStatus, Post } from "@nestjs/common"
import { createUser } from "src/services/users/createUser.service";
import { createUserDTO } from "src/services/users/users.dto";


@Controller("users")
export class UserController {
	constructor(
		private readonly createUser: createUser
	) { }

	@Post()
	async create(@Body() data: createUserDTO)
	{
		try {
			return await this.createUser.execute(data)
		} catch (error) {
			throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
		}
	}
}