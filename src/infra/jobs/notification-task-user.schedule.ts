import { Injectable } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { ITaskUserRepository } from '../../repositories/task-user.repository';


@Injectable()
export class NotificationTaskUserSchedule {

	constructor(
		private taskRepository: ITaskUserRepository
	){}

	@Cron(CronExpression.EVERY_10_SECONDS)
	async getAllTaskDay()
	{
		const allTasks = await this.taskRepository.findAllStartDay();

		console.log("AllTasks! ", allTasks);
	}
}