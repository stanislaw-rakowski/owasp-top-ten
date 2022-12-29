import { Type, Static } from '@sinclair/typebox'

export const AccountSchema = Type.Object({
	id: Type.String({ format: 'uuid' }),
	login: Type.String({ format: 'email' }),
	password: Type.String(),
	salt: Type.String(),
})

export type Account = Static<typeof AccountSchema>

export const AccountRequestSchema = Type.Object({
	login: Type.String({ format: 'email' }),
	password: Type.String(),
})

export const SignupResponseSchema = Type.Object({
	id: Type.String({ format: 'uuid' }),
	login: Type.String({ format: 'email' }),
	password: Type.String(),
})

export const LoginResponseSchema = Type.Object({
	id: Type.String({ format: 'uuid' }),
	login: Type.String({ format: 'email' }),
})
