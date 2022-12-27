import fp from 'fastify-plugin'
import { FastifyInstance } from 'fastify'
import sensible, { SensibleOptions } from '@fastify/sensible'

async function Sensible(server: FastifyInstance) {
	server.register<SensibleOptions>(sensible)
}

export default fp(Sensible)
