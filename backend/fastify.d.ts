import { Pool } from 'mysql2/promise'
import { Env } from './src/schemas/env'

declare module 'fastify' {
	interface FastifyInstance {
		config: Env
		mysql: Pool
	}
}
