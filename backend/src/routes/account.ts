import { FastifyInstance } from 'fastify'
import { AccountController } from '../controllers/account'
import { AccountRequestSchema, SignupResponseSchema, LoginResponseSchema } from '../schemas/account'

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
		url: '/login',
		method: 'POST',
		schema: {
			body: AccountRequestSchema,
			response: {
				200: LoginResponseSchema,
			},
		},
		handler: controller.loginIntoAccount,
	})
}
