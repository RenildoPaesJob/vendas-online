export type createUserDTO = {
	name: string,
	username: string,
	password: string,
	email: string
}

export type UserCreatedDTO = {
	id: string,
	createdAt: Date
} & createUserDTO // tudo que tem no type UserCreateDTO + createUserDTO

export type UsernameAndEmail = {
	username: string,
	email: string
}