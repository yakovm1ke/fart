<script setup lang='ts'>
import Input from '@/components/ui/input.vue'
import Button from '@/components/ui/button.vue'
import { useMainStore } from '@/stores/main'
import { storeToRefs } from 'pinia'
import { Ref, ref, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { useHead } from 'unhead'

const store = useMainStore()
const router = useRouter()
store.resetStore()
const { users, isUsersValid } = storeToRefs(store)

const fieldsRefs: Ref<typeof Input[]> = ref([])
const addButtonRef: Ref<typeof Button | null> = ref(null)

if (!users.value.length) {
	router.push('/farting')
}

function handleUserChange(index: number, name: string) {
	users.value[index].name = name
}

function focusNext(event: KeyboardEvent, index: number) {
	if (event.key !== 'Enter') return

	if (index === fieldsRefs.value.length - 1) {
		handleSubmit()
		return
	}

	if (users.value[index].name) {
		fieldsRefs.value[index + 1].focus()
		return
	}
}

async function handleUserAdd() {
	store.addUser()
	await nextTick()
	fieldsRefs.value[fieldsRefs.value.length - 1].focus()
}

function handleSubmit() {
	if (!isUsersValid.value) return
	router.push('/farting')
}

useHead({
	title: 'Start fart',
})
</script>

<template>
  <div :class='$style.container'>
    <div :class='$style.fields'>
      <Input
        v-for='(user, index) in users'
        :key='user.id'
        ref='fieldsRefs'
        placeholder='Name'
        :value='user.name'
        @input='(name) => handleUserChange(index, name)'
        @keydown='(event) => focusNext(event, index)'
      >
        <template #after>
          <button
            :class='$style.deleteIcon'
            tabindex='-1'
            v-if='users.length > 2'
            @click='store.deleteUser(index)'
          >
            —
          </button>
        </template>
      </Input>
      <Button
        fill
        @click='handleUserAdd'
        variant='dark'
        :class='$style.addButton'
        ref='addButtonRef'
      >
        Add
      </Button>
      <Button
        fill
        variant='primary'
        @click='handleSubmit'
        :disabled='!isUsersValid'
      >
        Let's fart
      </Button>
    </div>
  </div>
</template>

<style module>
.container {
  max-width: 400px;
  margin: 0 auto;
  box-sizing: border-box;
}
.fields {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  box-sizing: border-box;
}
.deleteIcon {
  background: none;
  font-weight: 900;
  outline: none;
  border: none;
  cursor: pointer;
  color: inherit;
}

@media screen and (max-width: 500px) {
  .fields {
    grid-template-columns: 1fr;
  }
}
</style>