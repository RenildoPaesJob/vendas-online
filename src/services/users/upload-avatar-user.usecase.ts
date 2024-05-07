import { Injectable } from "@nestjs/common";
import { AvatarDTO } from "src/dto/user/users.dto";
import { IUserRepository } from "../../repositories/user/user.repository";
import { IStorage } from '../../infra/providers/storage/storage';
import { extname } from "path"

@Injectable()
export class UploadAvatarUserUserCase {

	constructor(
		private strorage: IStorage,
		private userRpository: IUserRepository
	){}

	async execute(data: AvatarDTO) {
		//novo nome arquivo
		const extFile = extname(data.file.originalname)
		const transformName = `${data.idUser}${extFile}`
		data.file.originalname = transformName

		//update db user with avatar path
		const file = await this.strorage.upload(data.file, "avatar")

		const pathAvatarUser = `avatar/${data.file.originalname}`
		await this.userRpository.uploadAvatar(data.idUser, pathAvatarUser)

		return file
	}
}