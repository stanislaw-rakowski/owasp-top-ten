import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { v4 as uuid } from 'uuid'
import { EmployeeRequestBody, Params, Employee } from '../schemas/employee'

export const EmployeeController = (server: FastifyInstance) => ({
	async createEmployee(request: FastifyRequest<{ Body: EmployeeRequestBody }>, reply: FastifyReply) {
		try {
			const organizationId = request.auth.organizationId
			const { name, shelter } = request.body

			const employeeId = uuid()

			await server.mysql.query(
				`INSERT INTO Employees (id, name, shelter, organization) 
				VALUES (?, ?, ?, ?)`,
				[employeeId, name, shelter, organizationId],
			)

			reply.status(201)

			return {
				id: employeeId,
				name,
				shelter,
			}
		} catch (error) {
			reply.status(500)

			return {
				message: 'Employee creation failed',
				error,
			}
		}
	},

	async getEmployees(request: FastifyRequest, reply: FastifyReply) {
		try {
			const organizationId = request.auth.organizationId

			const [results] = (await server.mysql.query(
				`SELECT Employees.id, Employees.name, Employees.shelter, Shelters.name as shelterName
				FROM Employees
				JOIN Shelters ON Employees.shelter = Shelters.shelterId
				AND Employees.organization = ?`,
				[organizationId],
			)) as [Employee[], unknown]

			reply.status(200)

			return results
		} catch (error) {
			reply.status(500)

			return {
				message: 'Failed to get shelter employees',
				error,
			}
		}
	},

	async getEmployeeById(request: FastifyRequest<{ Params: Params }>, reply: FastifyReply) {
		try {
			const { id } = request.params

			const [[result]] = (await server.mysql.query(
				`SELECT Employees.id, Employees.name, Employees.shelter, Shelters.name as shelterName
				FROM Employees
				JOIN Shelters ON Employees.shelter = Shelters.shelterId
				AND Employees.id = ?`,
				[id],
			)) as [Employee[], unknown]

			reply.status(200)

			return result
		} catch (error) {
			reply.status(500)

			return {
				message: 'Failed to get employee',
				error,
			}
		}
	},

	async updateEmployeeById(
		request: FastifyRequest<{ Params: Params; Body: EmployeeRequestBody }>,
		reply: FastifyReply,
	) {
		try {
			const { id } = request.params
			const { name } = request.body

			await server.mysql.query(
				`UPDATE Employees 
				SET name = ?
				WHERE id = ?`,
				[name, id],
			)

			reply.status(200)

			return { message: 'ok' }
		} catch (error) {
			reply.status(500)

			return {
				message: 'Failed to update employee',
				error,
			}
		}
	},

	async deleteEmployees(request: FastifyRequest, reply: FastifyReply) {
		try {
			const organizationId = request.auth.organizationId

			await server.mysql.query(
				`DELETE FROM Employees 
				WHERE organization = ?`,
				[organizationId],
			)

			reply.status(200)

			return { message: 'ok' }
		} catch (error) {
			reply.status(500)

			return {
				message: 'Employees deletion failed',
				error,
			}
		}
	},

	async deleteEmployeeById(request: FastifyRequest<{ Params: Params }>, reply: FastifyReply) {
		try {
			const { id } = request.params

			await server.mysql.query(
				`DELETE FROM Employees 
				WHERE id = ?`,
				[id],
			)

			reply.status(200)

			return { message: 'ok' }
		} catch (error) {
			reply.status(500)

			return {
				message: 'Employee deletion failed',
				error,
			}
		}
	},
})
