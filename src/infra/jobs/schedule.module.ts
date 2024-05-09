import { Module } from "@nestjs/common";
import { NotificationTaskUserSchedule } from "./notification-task-user.schedule";
import { ScheduleModule } from "@nestjs/schedule";
import { ITaskUserRepository } from "src/repositories/task-user.repository";
import { TaskUserPrismaRepository } from "src/repositories/prisma/task-user.prisma";

@Module({
	imports: [
		ScheduleModule.forRoot(),
	],
	providers: [NotificationTaskUserSchedule,
		{
			provide: ITaskUserRepository,
			useClass: TaskUserPrismaRepository
		}
	]
})
export class ScheduleTaskModule {}