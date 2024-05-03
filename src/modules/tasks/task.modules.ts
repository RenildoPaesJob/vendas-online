import { Module } from "@nestjs/common";
import { TaskUserController } from "src/controllers/task/task-user.controller";
import { PrismaService } from "src/infra/database/prisma.database";
import { TaskUserPrismaRepository } from "src/repositories/prisma/task-user.prisma";
import { ITaskUserRepository } from "src/repositories/task-user.repository";
import { CreateTaskUserUseCase } from "src/services/tasks/create-task-user.usecase";

@Module({
	controllers: [TaskUserController],
	providers: [
		PrismaService,
		CreateTaskUserUseCase,
		{
			provide: ITaskUserRepository,
			useClass: TaskUserPrismaRepository
		}
	]
})
export class TaskUserModule { }