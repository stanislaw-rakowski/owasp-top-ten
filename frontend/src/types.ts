export type AuthData = {
	id: string
	login: string
	password: string
}

export type AuthStorage = AuthData & {
	expires: number
}

export type AuthRequest = {
	login: string
	password: string
}
