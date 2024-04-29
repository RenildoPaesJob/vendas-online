import { Module } from '@nestjs/common';
import { UserModule } from './modules/users/user.modules';

@Module({
  controllers: [],
  providers  : [],
  imports    : [UserModule],
})

export class AppModule {}
