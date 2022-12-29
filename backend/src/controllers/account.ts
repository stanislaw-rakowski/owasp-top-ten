import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { v4 as uuid } from 'uuid'
import { hashPassword } from '../utils/hash'
import { Account } from '../schemas/account'

export const AccountController = (server: FastifyInstance) => ({
	async createAccount(request: FastifyRequest<{ Body: Account }>, reply: FastifyReply) {
		try {
			const { login, password } = request.body

			const [accounts] = (await server.mysql.query(
				`SELECT * 
				FROM Accounts 
				WHERE login = ?
			`,
				[login],
			)) as [Account[], unknown]

			if (accounts.length > 0) {
				reply.status(403)

				return {
					message: `Account with login ${login} is already registered`,
				}
			}

			const { hash, salt } = hashPassword(password)

			const id = uuid()

			await server.mysql.query(
				`INSERT INTO Accounts (id, login, password, salt) 
				VALUES (?, ?, ?, ?)`,
				[id, login, hash, salt],
			)

			reply.status(201)

			return {
				password: hash,
				login,
			}
		} catch (error) {
			reply.status(500)

			return {
				message: 'Account registration failed',
				error,
			}
		}
	},

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
	},

	async loginIntoAccount(request: FastifyRequest<{ Body: Account }>, reply: FastifyReply) {
		try {
			const { login, password } = request.body

			const [accounts] = await server.mysql.query(
				`SELECT * FROM Accounts WHERE login = "${login}" AND password = "${password}"`,
			)

			reply.status(200)

			return { accounts }
		} catch (error) {
			reply.status(500)

			return {
				message: 'Account login failed',
				error,
			}
		}
	},
})
