import { ArgumentMetadata, HttpException, HttpStatus, Injectable, PipeTransform } from "@nestjs/common";
import { createUserDTO } from "src/services/users/users.dto";

@Injectable()
export class CreateUserValidationPipe implements PipeTransform {
	transform({
		name, email, username, password
	}: createUserDTO, metadata: ArgumentMetadata) {

		if (!name || !email || !username || !password) {
			throw new HttpException(
				`[name, email, username, password] is required!`,
				HttpStatus.UNPROCESSABLE_ENTITY
			)
		}

		return {
			name, username, email, password
		}
	}
}