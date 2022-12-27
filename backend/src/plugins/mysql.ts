import { FastifyInstance } from 'fastify'
import fp from 'fastify-plugin'
import { createPool } from 'mysql2/promise'

async function MySql(server: FastifyInstance) {
	const connection = createPool({
		host: server.config.MYSQLHOST || 'localhost',
		user: server.config.MYSQLUSER || 'user',
		password: server.config.MYSQLPASSWORD || 'foobar',
		database: server.config.MYSQLDATABASE || 'db',
		port: Number(server.config.MYSQLPORT) || 3306,
	})

	server.addHook('onClose', async () => {
		await connection.end()
	})

	server.decorate('mysql', connection)
}

export default fp(MySql)
