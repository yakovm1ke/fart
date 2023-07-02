import { nanoid } from 'nanoid'

export interface User {
  id: string
  name: string
}

export function createUser(name = ''): User {
	return {
		id: nanoid(),
		name,
	}
}

export function createEmptyUsers(count: number) {
	const users = []
	for (let i = 0; i < count; i++) {
		users.push(createUser())
	}
	return users
}