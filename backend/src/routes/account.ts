import { FastifyInstance } from 'fastify'
import { AccountController } from '../controllers/account'
import { AccountRequestSchema, SignupResponseSchema } from '../schemas/account'

export const autoPrefix = '/account'

export default async function Account(server: FastifyInstance) {
	const controller = AccountController(server)

	server.route({
		url: '/signup',
		method: 'POST',
		schema: {
			body: AccountRequestSchema,
			response: {
				201: SignupResponseSchema,
			},
		},
		handler: controller.createAccount,
	})

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
