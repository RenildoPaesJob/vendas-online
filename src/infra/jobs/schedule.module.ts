import { Module } from "@nestjs/common";
import { NotificationTaskUserSchedule } from "./notification-task-user.schedule";
import { ScheduleModule } from "@nestjs/schedule";
import { ITaskUserRepository } from "src/repositories/task-user.repository";
import { TaskUserPrismaRepository } from "src/repositories/prisma/task-user.prisma";
import { ClientsModule, Transport } from "@nestjs/microservices";

@Module({
	imports: [
		ScheduleModule.forRoot(),
		ClientsModule.register([{
			name: 'NOTIFICATION',
			transport: Transport.TCP,
			options: {
				port: 3002,
				host: "127.0.0.1"
			}
		}])
	],
	providers: [NotificationTaskUserSchedule,
		{
			provide: ITaskUserRepository,
			useClass: TaskUserPrismaRepository
		}
	]
})
export class ScheduleTaskModule {}