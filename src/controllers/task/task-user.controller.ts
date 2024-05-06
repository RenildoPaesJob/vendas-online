import { Body, Controller, Post, Request, UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/infra/providers/auth-guards";
import { CreateTaskUserSchemaDTO } from "src/schemas/task-user.schema";
import { CreateTaskUserUseCase } from "src/services/tasks/create-task-user.usecase";

@Controller("/tasks")
export class TaskUserController
{
	constructor(
		private taskUserUseCase: CreateTaskUserUseCase
	){}

	@UseGuards(AuthGuard)
	@Post("/create")
	async create(@Body() data: CreateTaskUserSchemaDTO, @Request() req){
		return this.taskUserUseCase.execute({
			...data,
			userId: req.user.sub
		})
	}
}