import { createZodDto } from "nestjs-zod"
import { z } from "nestjs-zod/z"

export const CreateUserSchema = z.object({
	name: z.string({
		required_error: "Name is required!"
	}),
	password: z.string({
		required_error: "Password is required!"
	}),
	username: z.string({
		required_error: "Username is required!"
	}),
	email: z.string({
		required_error: "Email is required!"
	}).email()
})

export class CreateUserSchemaDTO extends createZodDto(CreateUserSchema) { }

// para emitir um campo ou vários ao passar por a validação do zod. e para exporta como um tipo,
// faz a linha debaixo
export const CreateUserResponseSchemaDTO = CreateUserSchema.omit({ password: true })

// faz uma inferecia da tipagem
export type CreateUserResponseSchemaDTO = z.infer<typeof CreateUserResponseSchemaDTO>