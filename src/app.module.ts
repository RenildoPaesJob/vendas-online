import { Module } from '@nestjs/common';
import { UserModule } from './users/user.modules';
import { ProductModule } from './products/product.modules';

@Module({
  controllers: [],
  providers  : [],
  imports    : [UserModule, ProductModule],
})

export class AppModule {}
