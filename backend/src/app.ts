import { join } from 'path'
import { FastifyInstance } from 'fastify'
import AutoLoad, { AutoloadPluginOptions } from '@fastify/autoload'
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox'

export type AppOptions = Partial<AutoloadPluginOptions>

async function App(server: FastifyInstance, opts: AppOptions) {
	server.withTypeProvider<TypeBoxTypeProvider>()

	server.register(AutoLoad, {
		dir: join(__dirname, 'plugins'),
		options: opts,
	})

	server.register(AutoLoad, {
		dir: join(__dirname, 'routes'),
		options: opts,
	})
}

export default App
