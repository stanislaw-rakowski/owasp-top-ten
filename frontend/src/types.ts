export type AuthData = {
	organizationId: string
	email: string
	token: string
}

export type AuthStorage = AuthData & {
	expires: number
}

export type AuthRequest = {
	email: string
	password: string
}
