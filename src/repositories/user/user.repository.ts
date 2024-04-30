import { UserCreatedDTO, UsernameAndEmail, createUserDTO } from "src/dto/user/users.dto";

export abstract class IUserRepository {

	abstract findByUsernameOrEmail(data: UsernameAndEmail): Promise<UserCreatedDTO | null>

	abstract save(data: createUserDTO): Promise<UserCreatedDTO>

	abstract findByusername(username: string): Promise<UserCreatedDTO | null>
}