import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import fp from 'fastify-plugin'
import { verify } from 'jsonwebtoken'

async function BearerAuth(server: FastifyInstance) {
	async function verifyBearerAuth(request: FastifyRequest, reply: FastifyReply) {
		if (!request.headers.authorization) {
			throw reply.unauthorized()
		}

		const [authType, token] = request.headers.authorization.split(' ')

		if (authType.toLowerCase() !== 'bearer' || !token) {
			throw reply.unauthorized()
		}

		try {
			const auth = verify(token, server.config.PRIVATE_KEY)

			request.auth = auth
		} catch {
			throw reply.unauthorized()
		}
	}

	server.decorate('verifyBearerAuth', verifyBearerAuth)
}

export default fp(BearerAuth)
