export type AuthData = {
	organizationId: string
	email: string
	token: string
}

export type AuthStorage = AuthData & {
	expires: number
}

export type AuthRequest = {
	email: string
	password: string
}

export type Shelter = {
	shelterId: string
	name: string
	published: 0 | 1
}

export type ShelterData = Omit<Shelter, 'shelterId'>

export type AnimalData = {
	name: string
	birthDate: string
	gender: 'male' | 'female'
	species: 'dog' | 'cat' | 'other'
	description: string
}

export type Animal = AnimalData & {
	id: string
	adopted: 0 | 1
	adoptionDate: string
	shelter: string
	employee: string
}

export type AnimalWithShelter = Animal & { shelterName: string }

export type AnimalForm = {
	[K in keyof AnimalData]: K extends 'gender' | 'species' ? AnimalData[K] | '' : AnimalData[K]
}

export type Employee = {
	id: string
	name: string
	shelter: string
	shelterName: string
}

export type EmployeeData = Omit<Employee, 'id' | 'shelterName'>
