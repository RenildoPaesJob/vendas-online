import { Module } from '@nestjs/common';
import { UserModule } from './modules/users/user.modules';
import { LoginModule } from './modules/login/sign-in.modules';
import { APP_PIPE } from '@nestjs/core';
import { ZodValidationPipe } from 'nestjs-zod';
import { TaskUserModule } from './modules/tasks/task.modules';

@Module({
  controllers: [],
  providers  : [{
		provide: APP_PIPE,
		useClass: ZodValidationPipe
	}],
  imports    : [UserModule, LoginModule, TaskUserModule],
})

export class AppModule {}
