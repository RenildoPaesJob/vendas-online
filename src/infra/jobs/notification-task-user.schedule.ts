import { Inject, Injectable } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { ITaskUserRepository } from '../../repositories/task-user.repository';
import { ClientProxy } from "@nestjs/microservices";

type MessageDTO = {
	email: string,
	startAt: Date,
	endAt: Date,
	name: string,
	title: string,
	description: string
}

@Injectable()
export class NotificationTaskUserSchedule {

	constructor(
		private taskRepository: ITaskUserRepository,
		@Inject("NOTIFICATION") private readonly notificationClient: ClientProxy
	) { }

	@Cron(CronExpression.EVERY_DAY_AT_11PM)
	async getAllTaskDay() {
		const allTasks = await this.taskRepository.findAllStartDay();

		console.log("=== NOTIFICANDO ===");

		if (allTasks) {
			allTasks.forEach( task => {
				const message : MessageDTO = {
					name: task.user.name,
					email: task.user.email,
					title: task.task.title,
					description: task.task.description,
					startAt: task.task.endAt,
					endAt: task.task.endAt,
				}
				this.notificationClient.emit("task_notification", message)
			})
		}

	}
}