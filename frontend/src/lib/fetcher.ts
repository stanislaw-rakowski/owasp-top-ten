export type FetchError<T = unknown> = Error & {
	data: T
	status: number
}

export const fetcher = async <T>(url: string, options?: RequestInit): Promise<T> => {
	const response = await fetch(url, {
		...options,
		headers: {
			...options?.headers,
			...(options?.body && { 'Content-Type': 'application/json' }),
		},
	})

	let data = {}
	if (response.headers.get('content-type')?.includes('application/json')) {
		data = await response.json()
	}

	if (response.ok) {
		return data as T
	}

	const error = new Error('Unable to fetch') as FetchError
	error.status = response.status
	error.data = data

	throw error
}
