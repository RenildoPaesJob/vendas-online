import { Controller, Get } from "@nestjs/common"

@Controller("products")
export class ProductController {
    @Get("")
    getProducts() {
        return "list products!";
    }

    @Get("/create")
    addProduct() {
        return "create product!";
    }
}