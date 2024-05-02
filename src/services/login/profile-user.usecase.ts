import { Injectable } from "@nestjs/common";
import { IUserRepository } from "src/repositories/user/user.repository";

@Injectable()
export class ProfileUserUserCase
{
	constructor(
		private userRepository: IUserRepository
	) { }

	async execute(id: string) {
		return this.userRepository.findById(id)
	}
}