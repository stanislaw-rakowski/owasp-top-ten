export type AuthData = {
	id: string
	login: string
	password: string
}

export type AuthRequest = {
	login: string
	password: string
}

export type UserCreationResponse = {
	message: string
	data: {
		id: string
		login: string
		password: string
	}
}
