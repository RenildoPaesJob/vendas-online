import { Injectable } from "@nestjs/common";
import { TaskUserRequestDTO } from "src/dto/tasks/task-user.dto";
import { ITaskUserRepository } from "src/repositories/task-user.repository";


@Injectable()
export class CreateTaskUserUseCase
{
	constructor(
		private taskUserRepository: ITaskUserRepository
	){}

	async execute(data: TaskUserRequestDTO)
	{
		return this.taskUserRepository.save(data)
	}
}