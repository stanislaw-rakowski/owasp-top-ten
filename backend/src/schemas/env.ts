import { Static, Type } from '@sinclair/typebox'

export const EnvSchema = Type.Required(
	Type.Object({
		PRIVATE_KEY: Type.String(),
		MYSQLDATABASE: Type.String(),
		MYSQLHOST: Type.String(),
		MYSQLPASSWORD: Type.String(),
		MYSQLPORT: Type.String(),
		MYSQLUSER: Type.String(),
		MYSQL_URL: Type.String(),
	}),
)

export type Env = Static<typeof EnvSchema>
