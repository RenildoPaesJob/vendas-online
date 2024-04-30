import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { LoginController } from "src/controllers/login/login.controller";
import { PrismaService } from "src/infra/database/prisma.service";
import { SignInUseCase } from "src/services/login/sign-in.usecase";

@Module({
	controllers: [LoginController],
	imports: [
		JwtModule.register({
			global: true,
			secret: "NESTJS_CURSO",
			signOptions: { expiresIn: "60s"}
		})
	],
	providers: [
		PrismaService,
		SignInUseCase
	]
})

export class LoginModule { }