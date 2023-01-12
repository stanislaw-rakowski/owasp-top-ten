import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { v4 as uuid } from 'uuid'
import { Account } from '../schemas/account'

export const AccountController = (server: FastifyInstance) => ({
	async createRandomUser(request: FastifyRequest, reply: FastifyReply) {
		const getRandomNumber = () => Math.floor(Math.random() * 10000)

		const id = uuid()
		const login = `user-${getRandomNumber()}`
		const password = `password-${getRandomNumber()}`

		await server.mysql.query(
			`INSERT INTO Accounts (id, login, password) 
			VALUES (?, ?, ?)`,
			[id, login, password],
		)

		reply.status(201)

		return {
			message: 'User created successfully',
			data: { id, login, password },
		}
	},

	async loginIntoAccount(request: FastifyRequest<{ Body: Account }>, reply: FastifyReply) {
		const { login, password } = request.body

		const [accounts] = await server.mysql.query(
			`SELECT * FROM Accounts WHERE login = "${login}" AND password = "${password}"`,
		)

		reply.status(200)

		return { accounts }
	},
})
