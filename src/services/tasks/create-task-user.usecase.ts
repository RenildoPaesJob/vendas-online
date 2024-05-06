import { Injectable, Logger } from "@nestjs/common";
import { TaskUserRequestDTO } from "src/dto/tasks/task-user.dto";
import { ITaskUserRepository } from "src/repositories/task-user.repository";


@Injectable()
export class CreateTaskUserUseCase
{
	private readonly logger = new Logger(CreateTaskUserUseCase.name)

	constructor(
		private taskUserRepository: ITaskUserRepository
	){}

	async execute(data: TaskUserRequestDTO)
	{
		this.logger.log(`... Criando task ...`, { ...data })
		return this.taskUserRepository.save(data)
	}
}