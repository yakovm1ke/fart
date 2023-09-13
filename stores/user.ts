import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

import { User } from '~/models'
import { createEmptyUsers, createUser } from '~/utils'

export const useUserStore = defineStore('user', () => {
	const users = ref<User[]>(createEmptyUsers(2))

	const addEmptyUser = () => {
		users.value.push(createUser())
	}

	const deleteUserByIndex = (index: number) => {
		users.value.splice(index, 1)
	}

	const deleteUserById = (removeId: string) => {
		users.value = users.value.filter(({ id }) => removeId !== id)
	}

	const getUserById = (userId: string) => {
		return users.value.find(({ id }) => id === userId)
	}

	const isUsersFilled = computed(() => {
		return users
			.value
			.filter(({ name }) => !name.trim())
			.length === 0
	})

	return {
		users,
		isUsersFilled,
		addEmptyUser,
		deleteUserById,
		deleteUserByIndex,
		getUserById,
	}
})