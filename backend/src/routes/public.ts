import { FastifyInstance } from 'fastify'
import { PublicController } from '../controllers/public'
import { AnimalController } from '../controllers/animal'
import { AnimalsSchema, AnimalSchema, ParamsSchema } from '../schemas/animal'
import { SheltersResponseSchema } from '../schemas/shelter'

export const autoPrefix = '/public'

export default async function Public(server: FastifyInstance) {
	const controller = PublicController(server)
	const animalController = AnimalController(server)

	server.route({
		url: '/shelters',
		method: 'GET',
		schema: {
			response: {
				200: SheltersResponseSchema,
			},
		},
		handler: controller.getShelters,
	})

	server.route({
		url: '/animals',
		method: 'GET',
		schema: {
			response: {
				200: AnimalsSchema,
			},
		},
		handler: controller.getAnimals,
	})

	server.route({
		url: '/animals/:id',
		method: 'GET',
		schema: {
			params: ParamsSchema,
			response: {
				200: AnimalSchema,
			},
		},
		handler: animalController.getAnimalById,
	})
}
