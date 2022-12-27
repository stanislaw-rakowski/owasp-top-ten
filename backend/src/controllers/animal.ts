import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { v4 as uuid } from 'uuid'
import { AnimalRequestBody, Params, ShelterParams, Animal } from '../schemas/animal'

export const AnimalController = (server: FastifyInstance) => ({
	async createAnimal(request: FastifyRequest<{ Params: ShelterParams; Body: AnimalRequestBody }>, reply: FastifyReply) {
		try {
			const organizationId = request.auth.organizationId
			const { shelterId } = request.params
			const { name, birthDate, gender, species, description } = request.body

			const animalId = uuid()

			await server.mysql.query(
				`INSERT INTO Animals (id, name, birthDate, gender, species, description, shelter, organization) 
				VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
				[animalId, name, birthDate, gender, species, description, shelterId, organizationId],
			)

			reply.status(201)

			return {
				id: animalId,
				shelter: shelterId,
				name,
				birthDate,
				gender,
				species,
				description,
			}
		} catch (error) {
			reply.status(500)

			return {
				message: 'Animal creation failed',
				error,
			}
		}
	},

	async getAllAnimals(request: FastifyRequest, reply: FastifyReply) {
		try {
			const organizationId = request.auth.organizationId

			const [results] = (await server.mysql.query(
				`SELECT Animals.*, Shelters.name as shelterName
				FROM Animals
				JOIN Shelters ON Animals.shelter = Shelters.shelterId
				AND Animals.organization = ?`,
				[organizationId],
			)) as [Animal[], unknown]

			reply.status(200)

			return results
		} catch (error) {
			reply.status(500)

			return {
				message: 'Failed to get shelter animals',
				error,
			}
		}
	},

	async getAnimals(request: FastifyRequest<{ Params: ShelterParams }>, reply: FastifyReply) {
		try {
			const { shelterId } = request.params

			const [results] = (await server.mysql.query(
				`SELECT * 
				FROM Animals 
				WHERE shelter = ?`,
				[shelterId],
			)) as [Animal[], unknown]

			reply.status(200)

			return results
		} catch (error) {
			reply.status(500)

			return {
				message: 'Failed to get shelter animals',
				error,
			}
		}
	},

	async getAnimalById(request: FastifyRequest<{ Params: Params }>, reply: FastifyReply) {
		try {
			const { id } = request.params

			const [[result]] = (await server.mysql.query(
				`SELECT * 
				FROM Animals 
				WHERE id = ?`,
				[id],
			)) as [Animal[], unknown]

			reply.status(200)

			return result
		} catch (error) {
			reply.status(500)

			return {
				message: 'Failed to get animal',
				error,
			}
		}
	},

	async updateAnimalById(request: FastifyRequest<{ Params: Params; Body: AnimalRequestBody }>, reply: FastifyReply) {
		try {
			const { id } = request.params
			const { name, birthDate, gender, species, description } = request.body

			await server.mysql.query(
				`UPDATE Animals 
				SET 
					name = ?, 
					birthDate = ?, 
					gender = ?, 
					species = ?, 
					description = ? 
				WHERE id = ?`,
				[name, birthDate, gender, species, description, id],
			)

			reply.status(200)

			return { message: 'ok' }
		} catch (error) {
			reply.status(500)

			return {
				message: 'Failed to update animal',
				error,
			}
		}
	},

	async deleteAnimals(request: FastifyRequest<{ Params: ShelterParams }>, reply: FastifyReply) {
		try {
			const { shelterId } = request.params

			await server.mysql.query(
				`DELETE FROM Animals 
				WHERE shelter = ?`,
				[shelterId],
			)

			reply.status(200)

			return { message: 'ok' }
		} catch (error) {
			reply.status(500)

			return {
				message: 'Animals deletion failed',
				error,
			}
		}
	},

	async deleteAnimalById(request: FastifyRequest<{ Params: Params }>, reply: FastifyReply) {
		try {
			const { id } = request.params

			await server.mysql.query(
				`DELETE FROM Animals 
				WHERE id = ?`,
				[id],
			)

			reply.status(200)

			return { message: 'ok' }
		} catch (error) {
			reply.status(500)

			return {
				message: 'Animal deletion failed',
				error,
			}
		}
	},
})
