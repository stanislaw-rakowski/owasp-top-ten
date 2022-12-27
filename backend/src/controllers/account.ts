import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { v4 as uuid } from 'uuid'
import { hashPassword, verifyPassword } from '../utils/hash'
import { Account } from '../schemas/account'

export const AccountController = (server: FastifyInstance) => ({
	async createAccount(request: FastifyRequest<{ Body: Account }>, reply: FastifyReply) {
		try {
			const { email, password } = request.body

			const [accounts] = (await server.mysql.query(
				`SELECT * 
				FROM Accounts 
				WHERE email = ?
			`,
				[email],
			)) as [Account[], unknown]

			if (accounts.length > 0) {
				reply.status(403)

				return {
					message: `Account with email ${email} is already registered`,
				}
			}

			const { hash, salt } = hashPassword(password)

			const id = uuid()

			await server.mysql.query(
				`INSERT INTO Accounts (id, email, password, salt) 
				VALUES (?, ?, ?, ?)`,
				[id, email, hash, salt],
			)

			reply.status(201)

			return {
				password: hash,
				email,
			}
		} catch (error) {
			reply.status(500)

			return {
				message: 'Account registration failed',
				error,
			}
		}
	},

	async loginIntoAccount(request: FastifyRequest<{ Body: Account }>, reply: FastifyReply) {
		try {
			const { email, password } = request.body

			const [accounts] = (await server.mysql.query(
				`SELECT * 
				FROM Accounts 
				WHERE email = ?`,
				[email],
			)) as [Account[], unknown]

			if (accounts.length === 0) {
				reply.status(404)

				return {
					message: `Account with email ${email} not found`,
				}
			}

			const [account] = accounts

			if (!verifyPassword(password, account.salt, account.password)) {
				reply.status(403)

				return {
					message: 'Incorrect password',
				}
			}

			reply.status(200)

			return {
				id: account.id,
				email: account.email,
			}
		} catch (error) {
			reply.status(500)

			return {
				message: 'Account login failed',
				error,
			}
		}
	},
})
