import { FastifyInstance } from 'fastify'
import { AccountController } from '../controllers/account'

export const autoPrefix = '/account'

export default async function Account(server: FastifyInstance) {
	const controller = AccountController(server)

	server.route({
		url: '/create_user',
		method: 'GET',
		handler: controller.createRandomUser,
	})

	server.route({
		url: '/login',
		method: 'POST',
		handler: controller.loginIntoAccount,
	})
}
