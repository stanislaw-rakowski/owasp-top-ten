import { FastifyInstance } from 'fastify'
import { AnimalController } from '../controllers/animal'
import {
	ParamsSchema,
	ShelterParamsSchema,
	AnimalSchema,
	AnimalsSchema,
	AllAnimalsSchema,
	AnimalRequestSchema,
	AnimalResponseSchema,
} from '../schemas/animal'
import { MessageResponseSchema } from '../schemas/common'

export const autoPrefix = '/animals'

export default async function Animal(server: FastifyInstance) {
	const controller = AnimalController(server)

	server.addHook('preHandler', server.verifyBearerAuth)

	server.route({
		url: '/',
		method: 'GET',
		schema: {
			response: {
				200: AllAnimalsSchema,
			},
		},
		handler: controller.getAllAnimals,
	})

	server.route({
		url: '/all/:shelterId',
		method: 'GET',
		schema: {
			params: ShelterParamsSchema,
			response: {
				200: AnimalsSchema,
			},
		},
		handler: controller.getAnimals,
	})

	server.route({
		url: '/:id',
		method: 'GET',
		schema: {
			params: ParamsSchema,
			response: {
				200: AnimalSchema,
			},
		},
		handler: controller.getAnimalById,
	})

	server.route({
		url: '/:shelterId',
		method: 'POST',
		schema: {
			params: ShelterParamsSchema,
			body: AnimalRequestSchema,
			response: {
				201: AnimalResponseSchema,
			},
		},
		handler: controller.createAnimal,
	})

	server.route({
		url: '/:id',
		method: 'PATCH',
		schema: {
			params: ParamsSchema,
			body: AnimalRequestSchema,
			response: {
				200: MessageResponseSchema,
			},
		},
		handler: controller.updateAnimalById,
	})

	server.route({
		url: '/all/:shelterId',
		method: 'DELETE',
		schema: {
			params: ShelterParamsSchema,
			response: {
				200: MessageResponseSchema,
			},
		},
		handler: controller.deleteAnimals,
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
		handler: controller.deleteAnimalById,
	})
}
