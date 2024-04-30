import { Module } from '@nestjs/common';
import { UserModule } from './modules/users/user.modules';
import { LoginModule } from './modules/login/sign-in.modules';

@Module({
  controllers: [],
  providers  : [],
  imports    : [UserModule, LoginModule],
})

export class AppModule {}
