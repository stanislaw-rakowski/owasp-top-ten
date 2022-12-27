import { Type, Static } from '@sinclair/typebox'

export const AnimalSchema = Type.Object({
	id: Type.String({ format: 'uuid' }),
	name: Type.String(),
	birthDate: Type.String(),
	gender: Type.Union([Type.Literal('male'), Type.Literal('female')]),
	species: Type.Union([Type.Literal('dog'), Type.Literal('cat'), Type.Literal('other')]),
	description: Type.String(),
	shelter: Type.String({ format: 'uuid' }),
	organization: Type.String({ format: 'uuid' }),
})

export type Animal = Static<typeof AnimalSchema>

export const AllAnimalsSchema = Type.Array(
	Type.Intersect([
		AnimalSchema,
		Type.Object({
			shelterName: Type.String(),
		}),
	]),
)

export const ShelterParamsSchema = Type.Object({
	shelterId: Type.String({ format: 'uuid' }),
})

export type ShelterParams = Static<typeof ShelterParamsSchema>

export const ParamsSchema = Type.Object({
	id: Type.String({ format: 'uuid' }),
})

export type Params = Static<typeof ParamsSchema>

export const AnimalRequestSchema = Type.Omit(AnimalSchema, ['id', 'shelter', 'organization'])

export type AnimalRequestBody = Static<typeof AnimalRequestSchema>

export const AnimalResponseSchema = Type.Omit(AnimalSchema, ['organization'])

export const AnimalsSchema = Type.Array(AnimalSchema)
