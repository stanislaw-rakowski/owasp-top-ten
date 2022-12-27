import { fetcher } from './fetcher'
import {
	AuthData,
	AuthRequest,
	ShelterData,
	Shelter,
	Animal,
	AnimalWithShelter,
	AnimalData,
	Employee,
	EmployeeData,
} from '../types'

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

/* Account */

export const requestLogin = (data: AuthRequest) => {
	return callApiEndpoint<AuthRequest, AuthData>('POST', `${baseUrl}/account/login`, data)
}

export const requestSignup = (data: AuthRequest) => {
	return callApiEndpoint<AuthRequest, AuthData>('POST', `${baseUrl}/account/signup`, data)
}

export const deleteAccount = () => {
	return callApiEndpoint<never, { message: string }>('DELETE', `${baseUrl}/account`)
}

export const seedAccountDatabase = () => {
	return callApiEndpoint<never, { message: string }>('GET', `${baseUrl}/account/seed`)
}

/* Shelter */

export const getShelters = () => {
	return callApiEndpoint<never, Shelter[]>('GET', `${baseUrl}/shelters`)
}

export const getShelterById = (id: string) => {
	return callApiEndpoint<never, Shelter>('GET', `${baseUrl}/shelters/${id}`)
}

export const createShelter = (name: string) => {
	return callApiEndpoint<ShelterData, Shelter>('POST', `${baseUrl}/shelters`, {
		name,
		published: 0,
	})
}

export const updateShelterById = (shelter: Shelter) => {
	const { shelterId, name, published } = shelter
	return callApiEndpoint<ShelterData, Shelter>('PATCH', `${baseUrl}/shelters/${shelterId}`, {
		name,
		published,
	})
}

export const deleteShelters = () => {
	return callApiEndpoint<never, { message: string }>('DELETE', `${baseUrl}/shelters`)
}

export const deleteShelterById = (shelterId: string) => {
	return callApiEndpoint<never, { message: string }>('DELETE', `${baseUrl}/shelters/${shelterId}`)
}

/* Animal */

export const getAllAnimals = () => {
	return callApiEndpoint<never, AnimalWithShelter[]>('GET', `${baseUrl}/animals`)
}

export const getAnimals = (shelterId: string) => {
	return callApiEndpoint<never, Animal[]>('GET', `${baseUrl}/animals/all/${shelterId}`)
}

export const getAnimalById = (id: string) => {
	return callApiEndpoint<never, Animal>('GET', `${baseUrl}/animals/${id}`)
}

export const createAnimal = (shelterId: string, animal: AnimalData) => {
	return callApiEndpoint<AnimalData, Animal>('POST', `${baseUrl}/animals/${shelterId}`, animal)
}

export const updateAnimalById = (id: string, animal: AnimalData) => {
	return callApiEndpoint<AnimalData, Animal>('PATCH', `${baseUrl}/animals/${id}`, animal)
}

export const deleteAnimals = (shelterId: string) => {
	return callApiEndpoint<never, { message: string }>('DELETE', `${baseUrl}/animals/all/${shelterId}`)
}

export const deleteAnimalById = (id: string) => {
	return callApiEndpoint<never, { message: string }>('DELETE', `${baseUrl}/animals/${id}`)
}

/* Employee */

export const getEmployees = () => {
	return callApiEndpoint<never, Employee[]>('GET', `${baseUrl}/employees`)
}

export const getEmployeeById = (id: string) => {
	return callApiEndpoint<never, Employee>('GET', `${baseUrl}/employees/${id}`)
}

export const createEmployee = (employee: EmployeeData) => {
	return callApiEndpoint<EmployeeData, Employee>('POST', `${baseUrl}/employees`, employee)
}

export const updateEmployeeById = (id: string, employee: EmployeeData) => {
	return callApiEndpoint<EmployeeData, Employee>('PATCH', `${baseUrl}/employees/${id}`, employee)
}

export const deleteEmployees = () => {
	return callApiEndpoint<never, { message: string }>('DELETE', `${baseUrl}/employees`)
}

export const deleteEmployeeById = (id: string) => {
	return callApiEndpoint<never, { message: string }>('DELETE', `${baseUrl}/employees/${id}`)
}

/* Public */

export const getPublicShelters = () => {
	return callApiEndpoint<never, Shelter[]>('GET', `${baseUrl}/public/shelters`)
}

export const getPublicAnimals = () => {
	return callApiEndpoint<never, Animal[]>('GET', `${baseUrl}/public/animals`)
}

export const getPublicAnimalById = (id: string) => {
	return callApiEndpoint<never, Animal>('GET', `${baseUrl}/public/animals/${id}`)
}
