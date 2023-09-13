import { nanoid } from 'nanoid'

import { User } from '~/models'

export function createUser(name = ''): User {
	return {
		id: nanoid(),
		name,
	}
}

export function createEmptyUsers(count: number) {
	const users: User[] = []
	for (let i = 0; i < count; i++) {
		users.push(createUser())
	}
	return users
}