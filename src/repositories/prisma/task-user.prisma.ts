import { TaskUserRequestDTO, TaskUserResponseDTO } from "src/dto/tasks/task-user.dto";
import { ITaskUserRepository } from "../task-user.repository";
import { PrismaService } from "src/infra/database/prisma.database";
import { Injectable } from "@nestjs/common";

@Injectable()
export class TaskUserPrismaRepository implements ITaskUserRepository
{
	constructor(
		private prisma: PrismaService
	) { }

	async save({
		description, endAt, startAt, title, priority, status, userId
	}: TaskUserRequestDTO): Promise<TaskUserResponseDTO> {

		return this.prisma.taskUser.create({
			data: {
				task: {
					create: {
						description, endAt, startAt, title, priority, status
					}
				},
				user: {
					connect: {
						id: userId
					}
				}
			}
		})

	}
}