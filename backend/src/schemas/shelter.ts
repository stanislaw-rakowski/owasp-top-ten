import { Type, Static } from '@sinclair/typebox'

export const ShelterSchema = Type.Object({
	shelterId: Type.String({ format: 'uuid' }),
	name: Type.String(),
	owner: Type.String({ format: 'uuid' }),
	published: Type.Union([Type.Literal(0), Type.Literal(1)]),
})

export type Shelter = Static<typeof ShelterSchema>

export const ParamsSchema = Type.Object({
	id: Type.String({ format: 'uuid' }),
})

export type Params = Static<typeof ParamsSchema>

export const ShelterRequestSchema = Type.Pick(ShelterSchema, ['name', 'published'])

export type ShelterRequestBody = Static<typeof ShelterRequestSchema>

export const ShelterResponseSchema = Type.Omit(ShelterSchema, ['owner'])

export const SheltersResponseSchema = Type.Array(ShelterResponseSchema)
