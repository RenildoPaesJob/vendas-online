import { Test } from "@nestjs/testing"
import { UserController } from "../user.controller"
import { createUser } from "../../../services/users/createUser.service"
import { CreateUserSchemaDTO } from "../../../schemas/create-user.schema"


describe("User Controller", () => {

	let userController: UserController

	beforeEach( async () => {
		const moduleRef = await Test.createTestingModule({
			controllers: [UserController],
			providers: [
				createUser
			]
		}).compile()
		userController = moduleRef.get<UserController>(UserController)
	})

	it("Should be able to create a new user", async () => {
		const body: CreateUserSchemaDTO = {
			name: "name_test",
			email:"email@test.com",
			username:"username_test",
			password:"12345"
		}
		const result = await userController.create(body)
		expect(result).toHaveProperty("id")
	})

})