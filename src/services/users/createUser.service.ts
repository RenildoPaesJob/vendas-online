import { HttpException, HttpStatus, Injectable } from "@nestjs/common"
import { createUserDTO } from "../../dto/user/users.dto"
import { hash } from "bcrypt"
import { IUserRepository } from "src/repositories/user/user.repository"

@Injectable()
export class createUser {

	constructor(private userRepository: IUserRepository) { }

	async execute(data: createUserDTO) {
		const user = await this.userRepository.findByUsernameOrEmail({
			username: data.username,
			email: data.email
		})

		if (user) throw new HttpException("User already exists!", HttpStatus.BAD_REQUEST)

		const password = await hash(data.password, 10)

		return await this.userRepository.save({
			...data,
			password
		})
	}
}