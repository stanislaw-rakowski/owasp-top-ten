import fp from 'fastify-plugin'
import env, { fastifyEnvOpt } from '@fastify/env'
import { FastifyInstance } from 'fastify'
import { EnvSchema } from '../schemas/env'

async function Env(server: FastifyInstance) {
	server.register<fastifyEnvOpt>(env, {
		dotenv: true,
		schema: EnvSchema,
	})
}

export default fp(Env)
