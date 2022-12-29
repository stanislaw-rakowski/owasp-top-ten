import { fetcher } from './fetcher'
import { AuthRequest, AuthData } from '../types'

const baseUrl = import.meta.env.VITE_SERVER_URL

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

const callApiEndpoint = <D, R>(method: Method, url: string, data?: D): Promise<R> => {
	return fetcher(url, {
		method,
		...(data && {
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
		}),
	})
}

export const requestLogin = (data: AuthRequest) => {
	return callApiEndpoint<AuthRequest, AuthData>('POST', `${baseUrl}/account/login`, data)
}

export const createRandomUser = () => {
	return callApiEndpoint<never, never>('GET', `${baseUrl}/account/create_user`)
}
