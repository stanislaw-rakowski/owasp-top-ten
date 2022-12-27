import { FastifyInstance } from 'fastify'
import { EmployeeController } from '../controllers/employee'
import {
	ParamsSchema,
	EmployeeSchema,
	EmployeesSchema,
	EmployeeRequestSchema,
	EmployeeCreationResponseSchema,
} from '../schemas/employee'
import { MessageResponseSchema } from '../schemas/common'

export const autoPrefix = '/employees'

export default async function Employee(server: FastifyInstance) {
	const controller = EmployeeController(server)

	server.addHook('preHandler', server.verifyBearerAuth)

	server.route({
		url: '/',
		method: 'GET',
		schema: {
			response: {
				200: EmployeesSchema,
			},
		},
		handler: controller.getEmployees,
	})

	server.route({
		url: '/:id',
		method: 'GET',
		schema: {
			params: ParamsSchema,
			response: {
				200: EmployeeSchema,
			},
		},
		handler: controller.getEmployeeById,
	})

	server.route({
		url: '/',
		method: 'POST',
		schema: {
			body: EmployeeRequestSchema,
			response: {
				201: EmployeeCreationResponseSchema,
			},
		},
		handler: controller.createEmployee,
	})

	server.route({
		url: '/:id',
		method: 'PATCH',
		schema: {
			params: ParamsSchema,
			body: EmployeeRequestSchema,
			response: {
				200: MessageResponseSchema,
			},
		},
		handler: controller.updateEmployeeById,
	})

	server.route({
		url: '/',
		method: 'DELETE',
		schema: {
			response: {
				200: MessageResponseSchema,
			},
		},
		handler: controller.deleteEmployees,
	})

	server.route({
		url: '/:id',
		method: 'DELETE',
		schema: {
			params: ParamsSchema,
			response: {
				200: MessageResponseSchema,
			},
		},
		handler: controller.deleteEmployeeById,
	})
}
