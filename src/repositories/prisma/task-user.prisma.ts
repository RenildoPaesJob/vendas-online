import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../infra/database/prisma.database";

import { TaskUserNotificationDTO, TaskUserRequestDTO, TaskUserResponseDTO } from "../../dto/tasks/task-user.dto";
import { ITaskUserRepository } from "../task-user.repository";
import { endOfDay, startOfDay } from "../../infra/utils/date";

@Injectable()
export class TaskUserPrismaRepository implements ITaskUserRepository {
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

	//buscar todas as task:
	// 16-06-2024 00:00:00
	// 16-06-2024 23:59:59
	async findAllStartDay(): Promise<TaskUserNotificationDTO[] | null> {
		const allTasks = await this.prisma.taskUser.findMany({
			where: {
				AND: [
					{
						task: {
							startAt: {
								gte: startOfDay(),
								lte: endOfDay()
							}
						}
					}
				]
			},
			include: {
				task: {
					select: {
						startAt: true,
						endAt: true,
						title: true,
						description: true
					}
				},
				user: true
			}
		})
		return allTasks ?? null
	}

}