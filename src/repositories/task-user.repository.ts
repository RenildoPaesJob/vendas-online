import { TaskUserRequestDTO, TaskUserResponseDTO } from "src/dto/tasks/task-user.dto";


export abstract class ITaskUserRepository {
	abstract save(data: TaskUserRequestDTO): Promise<TaskUserResponseDTO>
}