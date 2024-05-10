import { Module } from '@nestjs/common';
import { UserModule } from './modules/users/user.modules';
import { LoginModule } from './modules/login/sign-in.modules';
import { APP_PIPE } from '@nestjs/core';
import { ZodValidationPipe } from 'nestjs-zod';
import { TaskUserModule } from './modules/tasks/task.modules';
import { ScheduleTaskModule } from './infra/jobs/schedule.module';
import { PrismaModule } from './infra/database/prisma.module';

@Module({
	controllers: [],
	providers: [{
		provide: APP_PIPE,
		useClass: ZodValidationPipe
	}],
	imports: [
		PrismaModule,
		UserModule,
		LoginModule,
		TaskUserModule,
		ScheduleTaskModule
	],
})

export class AppModule { }
