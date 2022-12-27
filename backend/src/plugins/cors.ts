import { FastifyInstance } from 'fastify'
import fp from 'fastify-plugin'
import cors, { FastifyCorsOptions } from '@fastify/cors'

async function Cors(server: FastifyInstance) {
	server.register<FastifyCorsOptions>(cors, {
		origin: [/^http:\/\/localhost:/, 'https://piesek.netlify.app'],
	})
}

export default fp(Cors)
