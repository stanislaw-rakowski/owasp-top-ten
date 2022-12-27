import { FastifyInstance } from 'fastify'
import fp from 'fastify-plugin'
import swagger, { SwaggerOptions } from '@fastify/swagger'

async function Swagger(server: FastifyInstance) {
	server.register<SwaggerOptions>(swagger, {
		routePrefix: '/docs',
		exposeRoute: true,
		swagger: {
			info: {
				title: 'Databases Project API',
				version: '1.0',
			},
		},
	})
}

export default fp(Swagger)
