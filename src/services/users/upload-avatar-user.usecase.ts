import { Injectable } from "@nestjs/common";
import { AvatarDTO } from "src/dto/user/users.dto";
import { IStorage } from "src/infra/providers/storage/storage";
import { IUserRepository } from "src/repositories/user/user.repository";

@Injectable()
export class UploadAvatarUserUserCase {

	constructor(
		private strorage: IStorage,
		private userRpository: IUserRepository
	){}

	async execute(data: AvatarDTO) {
		const file = await this.strorage.upload(data.file, "avatar")
		console.log('🚀 ~ UploadAvatarUserUserCase ~ execute ~ file:', file)
		return file
	}
}