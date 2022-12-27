import { AuthData, AuthStorage } from '../types'

const KEY = 'auth'
const EXPIRATION = 1000 * 60 * 60 * 24

export const setAuth = (data: AuthData) => {
	sessionStorage.setItem(
		KEY,
		JSON.stringify({
			...data,
			expires: Date.now() + EXPIRATION,
		}),
	)
}

export const getAuth = () => {
	const data = sessionStorage.getItem(KEY)

	if (!data) return

	const parsedData = JSON.parse(data) as AuthStorage

	if (parsedData.expires < Date.now()) {
		sessionStorage.removeItem(KEY)
		window.location.reload()
	}

	return parsedData
}

export const removeAuth = () => sessionStorage.removeItem(KEY)
