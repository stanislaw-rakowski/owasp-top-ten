import { Type } from '@sinclair/typebox'

export const MessageResponseSchema = Type.Object({
	message: Type.String(),
})
