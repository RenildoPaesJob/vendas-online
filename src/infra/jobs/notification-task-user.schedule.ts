import { Injectable } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";


@Injectable()
export class NotificationTaskUserSchedule {

	@Cron(CronExpression.EVERY_5_SECONDS)
	getAllTaskDay()
	{
		console.log("Task OK! " + new Date());
	}
}