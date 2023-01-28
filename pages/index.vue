<script setup lang='ts'>
import Input from '@/components/ui/input.vue';
import Button from '@/components/ui/button.vue';
import { useMainStore } from '@/stores/main';
import { storeToRefs } from 'pinia';
import { Ref, ref, VNode, VNodeRef } from 'vue';

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

  if (index !== fieldsRefs.value.length - 1 && !!users.value[index].name) {
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
  router.push('/farting')
}

useHead({
  title: 'Start fart'
})
</script>

<template>
  <div>
    <div :class='$style.heading'>START FART</div>
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
        <template #afterInput>
          <Button
            tabindex='-1'
            v-if='users.length > 2'
            variant='circle'
            @click='store.deleteUser(index)'
          >
            -
          </Button>
        </template>
      </Input>
    </div>
    <Button
      @click='handleUserAdd'
      variant='none'
      :class='$style.addButton'
      ref='addButtonRef'
    >
      Add
    </Button>
    <Button
      fill
      variant='primary'
      @click='handleSubmit'
      :class='$style.submitButton'
      :disabled='!isUsersValid'
    >
      Let's fart*
    </Button>
    <div :class='$style.caption'>
      * Fart is an abbreviation for the phrase "Fair Cart" which is frequently used in Yerevan, Armenia
    </div>
  </div>
</template>

<style module>
.heading {
  font-weight: 600;
  color: var(--main);
}
.fields {
  margin-top: 28px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;
  box-sizing: border-box;
}
.addButton {
  margin-top: 16px;
}
.submitButton {
  margin-top: 28px;
}
.caption {
  margin-top: 8px;
  font-size: 12px;
  color: var(--gray);
}

@media screen and (max-width: 500px) {
  .fields {
    grid-template-columns: 1fr;
  }
}
</style>