<script setup lang='ts'>
import { storeToRefs } from 'pinia'

import { navigateTo, nextTick, ref } from '#imports'
import Button from '~/components/ui/button.vue'
import Input from '~/components/ui/input.vue'
import { Page } from '~/models'
import { useUserStore } from '~/stores'

const MIN_REQUIRED_USERS = 2
const usersStore = useUserStore()
const { users, isUsersFilled } = storeToRefs(usersStore)

const inputsRefs = ref<InstanceType<typeof Input>[]>([])

const handleSubmit = () => {
	if (!isUsersFilled) {
		return window.alert('Please fill users')
	}

	return navigateTo({ name: Page.Farting })
}

const handleInputKeydown = (event: KeyboardEvent, index: number) => {
	if (event.key !== 'Enter') return

	// pressed "Enter" in the last input
	if (index === users.value.length - 1) {
		return handleSubmit()
	}

	// current input is filled
	if (users.value[index].name.trim()) {
		return inputsRefs.value[index + 1]?.focus()
	}
}

const handleUserAdd = async() => {
	usersStore.addEmptyUser()
	await nextTick()
	inputsRefs.value[users.value.length - 1].focus()
}
</script>

<template>
	<form
		:class="$style.form"
		@submit.prevent
	>
		<Input
			v-for="({id, name}, index) in users"
			:key="id"
			ref="inputsRefs"
			:placeholder="`Farter ${(index + 1)}`"
			:value="name"
			:autofocus="index === 0"
			@input="(value) => users[index].name = value"
			@keydown="handleInputKeydown($event, index)"
		>
			<template #after>
				<button
					v-if="users.length > MIN_REQUIRED_USERS"
					type="button"
					tabindex="-1"
					:class="$style.deleteIcon"
					@click="usersStore.deleteUserById(id)"
				>
					X
				</button>
			</template>
		</Input>

		<Button
			type="button"
			fill
			variant="dark"
			@click="handleUserAdd()"
		>
			Add user
		</Button>

		<Button
			type="button"
			fill
			variant="primary"
			:disabled="!isUsersFilled"
			@click="handleSubmit()"
		>
			Let's fart
		</Button>
	</form>
</template>

<style module>
.form {
  max-width: 400px;
  margin: 0 auto;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.deleteIcon {
  all: unset;
  cursor: pointer;
}

.deleteIcon:hover {
  color: var(--main);
}
</style>