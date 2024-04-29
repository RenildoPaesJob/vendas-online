import { Module } from "@nestjs/common"
import { ProductController } from "./product.controller"

@Module({
    controllers: [ProductController],
    providers: [],
    exports: []
})

export class ProductModule {}