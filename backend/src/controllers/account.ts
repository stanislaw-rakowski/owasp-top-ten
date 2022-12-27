import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { v4 as uuid } from 'uuid'
import { sign } from 'jsonwebtoken'
import { hashPassword, verifyPassword } from '../utils/hash'
import { Account } from '../schemas/account'
import getMockedData from '../utils/getMockedData'

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

			const organizationId = uuid()

			await server.mysql.query(
				`INSERT INTO Accounts (organizationId, email, password, salt) 
				VALUES (?, ?, ?, ?)`,
				[organizationId, email, hash, salt],
			)

			reply.status(201)

			return {
				organizationId,
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

			const token = sign(
				{
					organizationId: account.organizationId,
					email: account.email,
				},
				server.config.PRIVATE_KEY,
				{ expiresIn: '24h' },
			)

			reply.status(200)

			return {
				organizationId: account.organizationId,
				email: account.email,
				token,
			}
		} catch (error) {
			reply.status(500)

			return {
				message: 'Account login failed',
				error,
			}
		}
	},

	async deleteAccount(request: FastifyRequest, reply: FastifyReply) {
		try {
			const organizationId = request.auth.organizationId

			await server.mysql.query(
				`DELETE FROM Accounts 
				WHERE organizationId = ?`,
				[organizationId],
			)

			reply.status(200)

			return {
				message: 'ok',
			}
		} catch (error) {
			reply.status(500)

			return {
				message: 'Account deletion failed',
				error,
			}
		}
	},

	async seedDatabase(request: FastifyRequest, reply: FastifyReply) {
		try {
			const organizationId = request.auth.organizationId

			const { shelters, employees, animals } = getMockedData()

			await server.mysql.query(`SET FOREIGN_KEY_CHECKS=0`)

			await Promise.all(
				shelters.map(({ id, name, published }) => {
					server.mysql.query(
						`INSERT INTO Shelters (shelterId, name, owner, published)
						VALUES (?, ?, ?, ?)`,
						[id, name, organizationId, published],
					)
				}),
			)

			await Promise.all(
				employees.map(({ id, name, shelter }) => {
					server.mysql.query(
						`INSERT INTO Employees (id, name, shelter, organization)
						VALUES (?, ?, ?, ?)`,
						[id, name, shelter, organizationId],
					)
				}),
			)

			await Promise.all(
				animals.map(({ id, name, birthDate, gender, species, description, shelter, employee }) => {
					server.mysql.query(
						`INSERT INTO Animals (id, name, birthDate, gender, species, description, shelter, employee, organization)
						VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
						[id, name, birthDate, gender, species, description, shelter, employee, organizationId],
					)
				}),
			)

			await server.mysql.query(`SET FOREIGN_KEY_CHECKS=1`)

			reply.status(200)

			return {
				message: 'ok',
			}
		} catch (error) {
			reply.status(500)

			return {
				message: 'Database seed failed',
				error,
			}
		}
	},
})
