import { UserCreatedDTO, UsernameAndEmail, createUserDTO } from "src/dto/user/users.dto";

export abstract class IUserRepository {

	abstract findByUsernameOrEmail(data: UsernameAndEmail): Promise<UserCreatedDTO | null>

	abstract save(data: createUserDTO): Promise<UserCreatedDTO>

	abstract findByusername(username: string): Promise<UserCreatedDTO | null>

	abstract findById(id: string): Promise<UserCreatedDTO | null>

	abstract uploadAvatar(id: string, path: string): Promise<void>
}