import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(
		private jwtService: JwtService
	) { }

	async canActivate(context: ExecutionContext)//: boolean | Promise<boolean> | Observable<boolean>
	{
		const request = context.switchToHttp().getRequest()
		const token = this.extractTokenFromHeader(request)

		if (!token) throw new UnauthorizedException()

		try {
			const payload = await this.jwtService.verifyAsync(token, {
				secret: "NESTJS_CURSO"
			})

			request['user'] = payload

			return true
		} catch (error) {
			throw new UnauthorizedException()
		}
	}

	private extractTokenFromHeader(req: Request): string | undefined {
		const [type, token] = req.headers.authorization?.split(' ') ?? []

		return type === "Bearer" ? token : undefined
	}
}