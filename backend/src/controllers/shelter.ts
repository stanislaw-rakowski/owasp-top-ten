import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { v4 as uuid } from 'uuid'
import { ShelterRequestBody, Params, Shelter } from '../schemas/shelter'

export const ShelterController = (server: FastifyInstance) => ({
	async createShelter(request: FastifyRequest<{ Body: ShelterRequestBody }>, reply: FastifyReply) {
		try {
			const organizationId = request.auth.organizationId
			const { name } = request.body

			const shelterId = uuid()

			await server.mysql.query(
				`INSERT INTO Shelters (shelterId, name, owner) 
				VALUES (?, ?, ?)`,
				[shelterId, name, organizationId],
			)

			reply.status(201)

			return { shelterId, name, published: 0 }
		} catch (error) {
			reply.status(500)

			return {
				message: 'Shelter creation failed',
				error,
			}
		}
	},

	async getShelters(request: FastifyRequest, reply: FastifyReply) {
		try {
			const organizationId = request.auth.organizationId

			const [results] = (await server.mysql.query(
				`SELECT * 
				FROM Shelters 
				WHERE owner = ?`,
				[organizationId],
			)) as [Shelter[], unknown]

			reply.status(200)

			return results
		} catch (error) {
			reply.status(500)

			return {
				message: 'Failed to get account shelters',
				error,
			}
		}
	},

	async getShelterById(request: FastifyRequest<{ Params: Params }>, reply: FastifyReply) {
		try {
			const shelterId = request.params.id

			const [[result]] = (await server.mysql.query(
				`SELECT * 
				FROM Shelters 
				WHERE shelterId = ?`,
				[shelterId],
			)) as [Shelter[], unknown]

			reply.status(200)

			return result
		} catch (error) {
			reply.status(500)

			return {
				message: 'Failed to get shelter',
				error,
			}
		}
	},

	async updateShelterById(request: FastifyRequest<{ Params: Params; Body: ShelterRequestBody }>, reply: FastifyReply) {
		try {
			const shelterId = request.params.id
			const { name, published } = request.body

			await server.mysql.query(
				`UPDATE Shelters 
				SET 
					name = ?, 
					published = ? 
				WHERE shelterId = ?`,
				[name, published, shelterId],
			)

			reply.status(200)

			return { message: 'ok' }
		} catch (error) {
			reply.status(500)

			return {
				message: 'Failed to update shelter',
				error,
			}
		}
	},

	async deleteShelters(request: FastifyRequest, reply: FastifyReply) {
		try {
			const organizationId = request.auth.organizationId

			await server.mysql.query(
				`DELETE FROM Shelters 
				WHERE owner = ?`,
				[organizationId],
			)

			reply.status(200)

			return { message: 'ok' }
		} catch (error) {
			reply.status(500)

			return {
				message: 'Shelters deletion failed',
				error,
			}
		}
	},

	async deleteShelterById(request: FastifyRequest<{ Params: Params }>, reply: FastifyReply) {
		try {
			const organizationId = request.auth.organizationId
			const shelterId = request.params.id

			await server.mysql.query(
				`DELETE FROM Shelters 
				WHERE shelterId = ? AND owner = ?`,
				[shelterId, organizationId],
			)

			reply.status(200)

			return { message: 'ok' }
		} catch (error) {
			reply.status(500)

			return {
				message: 'Shelter deletion failed',
				error,
			}
		}
	},
})
