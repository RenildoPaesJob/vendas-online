import { Module } from '@nestjs/common';
import { UserModule } from './modules/users/user.modules';
import { LoginModule } from './modules/login/sign-in.modules';
import { APP_PIPE } from '@nestjs/core';
import { ZodValidationPipe } from 'nestjs-zod';

@Module({
  controllers: [],
  providers  : [{
		provide: APP_PIPE,
		useClass: ZodValidationPipe
	}],
  imports    : [UserModule, LoginModule],
})

export class AppModule {}
