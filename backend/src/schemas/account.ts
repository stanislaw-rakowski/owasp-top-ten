import { Type, Static } from '@sinclair/typebox'

export const AccountSchema = Type.Object({
	organizationId: Type.String({ format: 'uuid' }),
	email: Type.String({ format: 'email' }),
	password: Type.String(),
	salt: Type.String(),
})

export type Account = Static<typeof AccountSchema>

export const AccountRequestSchema = Type.Object({
	email: Type.String({ format: 'email' }),
	password: Type.String(),
})

export const SignupResponseSchema = Type.Object({
	organizationId: Type.String({ format: 'uuid' }),
	email: Type.String({ format: 'email' }),
	password: Type.String(),
})

export const LoginResponseSchema = Type.Object({
	organizationId: Type.String({ format: 'uuid' }),
	email: Type.String({ format: 'email' }),
	token: Type.String(),
})
