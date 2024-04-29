import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common"
import { randomUUID } from "crypto"

type ParamsUser = {
    id: string
    idEmpresa: string
}

type BodyUser = {
    name: string
    age: number
}

@Controller("users")
export class UserController {

    /**
     * https://localhost:3000/users/3212312/3213213
     * @param params id e idEmpresa
     * @returns string
     */
    @Get("/:id/:idEmpresa")
    // helloUser(@Param("id") id: string, @Param("idEmpresa") idEmpresa: string) {
    helloUser(@Param() params: ParamsUser) {
        return "Usuário de ID " + params.id + " e empresa " + params.idEmpresa
    }

    /**
     * http://localhost:3000/users?p=10&r=100
     */
    @Get("/findByPages")
    findByPages(@Query() queries: any){
        return `Queries ${JSON.stringify(queries)}`
    }

    @Post("/create")
    createUser(@Body() body: BodyUser){
        return `Body: ${body.name} idade: ${body.age} id: ${randomUUID()}`
    }
}