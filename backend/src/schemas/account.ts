import { Type, Static } from '@sinclair/typebox'

export const AccountSchema = Type.Object({
	id: Type.String(),
	login: Type.String(),
	password: Type.String(),
})

export type Account = Static<typeof AccountSchema>
