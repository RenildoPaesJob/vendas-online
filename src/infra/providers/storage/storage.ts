import { FileDTO } from "src/dto/user/users.dto";


export abstract class IStorage {
	abstract upload(file: FileDTO, folder: string): Promise<any>
}