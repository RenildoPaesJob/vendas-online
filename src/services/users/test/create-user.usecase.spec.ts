import { Test } from "@nestjs/testing"
import { createUser } from "../createUser.service"
import { IUserRepository } from "../../../repositories/user/user.repository"
import { createUserDTO } from "../../../dto/user/users.dto"


describe("createUser", async () => {

	let createUserUseCase: createUser

	beforeEach(async () => {
		const moduleRef = await Test.createTestingModule({
			providers: [
				createUser,
				{
					provide: IUserRepository,
					useValue: {
						findByUsernameOrEmail: jest.fn(),
						save: jest.fn()
					}
				}
			]
		}).compile()

		createUserUseCase = moduleRef.get<createUser>(createUser)
	})

	it("Should be able to create a new user", async () => {

		const data: createUserDTO = {
			name: "Name test",
			email: "email@teste.com",
			username: "username_test",
			password: "12345",
		}

		const restult = await createUserUseCase.execute(data)

	})

})