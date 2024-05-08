import { Test } from "@nestjs/testing"
import { JwtModule } from "@nestjs/jwt"

import { UserController } from "../user.controller"
import { createUser } from "../../../services/users/createUser.service"
import { CreateUserSchemaDTO } from "../../../schemas/create-user.schema"
import { IUserRepository } from "../../../repositories/user/user.repository"
import { ProfileUserUserCase } from "../../../services/login/profile-user.usecase"
import { UploadAvatarUserUserCase } from "../../../services/users/upload-avatar-user.usecase"
import { IStorage } from "../../../infra/providers/storage/storage"
import { randomUUID } from "crypto"

describe('User Controller', () => {

	let userController: UserController
	let userRepository: IUserRepository

	beforeEach(async () => {
		const moduleRef = await Test.createTestingModule({
			imports: [JwtModule],
			controllers: [UserController],
			providers: [
				createUser,
				ProfileUserUserCase,
				UploadAvatarUserUserCase,
				{
					provide: IUserRepository,
					useValue: {
						findByUsernameOrEmail: jest.fn(),
						save: jest.fn()
					}
				},
				{
					provide: IStorage,
					useValue: {
						upload: jest.fn()
					}
				}
			]
		}).compile()
		userController = moduleRef.get<UserController>(UserController)
		userRepository = moduleRef.get<IUserRepository>(IUserRepository)
	})

	it("Should be able to create a new user", async () => {
		const body: CreateUserSchemaDTO = {
			name: "name_test",
			email: "email@test.com",
			username: "username_test",
			password: "12345"
		}

		jest.spyOn(userRepository, 'save').mockResolvedValue({
			...body,
			id: randomUUID(),
			createdAt: new Date()
		})

		const result = await userController.create(body)
		expect(result).toHaveProperty("username")
	})

})