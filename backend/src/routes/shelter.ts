import { FastifyInstance } from 'fastify'
import { ShelterController } from '../controllers/shelter'
import { ShelterRequestSchema, SheltersResponseSchema, ShelterResponseSchema, ParamsSchema } from '../schemas/shelter'
import { MessageResponseSchema } from '../schemas/common'

export const autoPrefix = '/shelters'

export default async function Shelter(server: FastifyInstance) {
	const controller = ShelterController(server)

	server.addHook('preHandler', server.verifyBearerAuth)

	server.route({
		url: '/',
		method: 'GET',
		schema: {
			response: {
				200: SheltersResponseSchema,
			},
		},
		handler: controller.getShelters,
	})

	server.route({
		url: '/:id',
		method: 'GET',
		schema: {
			params: ParamsSchema,
			response: {
				200: ShelterResponseSchema,
			},
		},
		handler: controller.getShelterById,
	})

	server.route({
		url: '/',
		method: 'POST',
		schema: {
			body: ShelterRequestSchema,
			response: {
				201: ShelterResponseSchema,
			},
		},
		handler: controller.createShelter,
	})

	server.route({
		url: '/:id',
		method: 'PATCH',
		schema: {
			params: ParamsSchema,
			body: ShelterRequestSchema,
			response: {
				200: MessageResponseSchema,
			},
		},
		handler: controller.updateShelterById,
	})

	server.route({
		url: '/',
		method: 'DELETE',
		schema: {
			response: {
				200: MessageResponseSchema,
			},
		},
		handler: controller.deleteShelters,
	})

	server.route({
		url: '/:id',
		method: 'DELETE',
		schema: {
			params: ParamsSchema,
			response: {
				200: MessageResponseSchema,
			},
		},
		handler: controller.deleteShelterById,
	})
}
