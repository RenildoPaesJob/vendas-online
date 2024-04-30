import { Body, Controller, Post } from "@nestjs/common";
import { SingInDTO } from "src/dto/login/sign-in.dto";
import { SignInUseCase } from "src/services/login/sign-in.usecase";

@Controller()
export class LoginController {

	constructor(
		private signInUseCase: SignInUseCase
	){}

	@Post("/signin")
	async signIn(@Body() signInDTO: SingInDTO)
	{
		return await this.signInUseCase.execute(signInDTO)
	}
}