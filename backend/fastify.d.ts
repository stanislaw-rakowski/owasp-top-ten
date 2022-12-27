import { Pool } from 'mysql2/promise'
import { Env } from './src/schemas/env'

declare module 'fastify' {
	interface FastifyInstance {
		config: Env
		mysql: Pool
		verifyBearerAuth: (request: FastifyRequest, reply: FastifyReply, done: (err?: Error) => void) => void
	}
	interface FastifyRequest {
		auth: JwtPayload
	}
}
