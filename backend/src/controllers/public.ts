import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { Animal } from '../schemas/animal'
import { Shelter } from '../schemas/shelter'

export const PublicController = (server: FastifyInstance) => ({
	async getAnimals(request: FastifyRequest, reply: FastifyReply) {
		try {
			const [results] = (await server.mysql.query(`
                SELECT * 
                FROM Animals 
                WHERE shelter IN (
                    SELECT shelterId
                    FROM Shelters
                    WHERE published = true
                )
            `)) as [Animal[], unknown]

			reply.status(200)

			return results
		} catch (error) {
			reply.status(500)

			return {
				message: 'Failed to get public animals',
				error,
			}
		}
	},

	async getShelters(request: FastifyRequest, reply: FastifyReply) {
		try {
			const [results] = (await server.mysql.query(`
                SELECT *
                FROM Shelters
                WHERE published = true
            `)) as [Shelter[], unknown]

			reply.status(200)

			return results
		} catch (error) {
			reply.status(500)

			return {
				message: 'Failed to get public shelters',
				error,
			}
		}
	},
})
