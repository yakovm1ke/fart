<script setup lang='ts'>
import Input from '@/components/ui/input.vue';
import Button from '@/components/ui/button.vue';
import { useMainStore } from '@/stores/main';
import { storeToRefs } from 'pinia';

const store = useMainStore()
const router = useRouter()
store.resetStore()
const { users, isUsersValid } = storeToRefs(store)

if (!users.value.length) {
  router.push('/farting')
}


function handleUserChange(index: number, name: string) {
  users.value[index].name = name
}
</script>

<template>
  <div>
    <div :class='$style.heading'>START FART</div>
    <div :class='$style.fields'>
      <div
        v-for='(user, index) in users'
        :class='$style.fieldWrapper'
        :key='user.id'
      >
        <Input
          placeholder='Name'
          :value='user.name'
          @input='(name) => handleUserChange(index, name)'
        />
        <Button
          v-if='users.length > 2'
          variant='circle'
          @click='store.deleteUser(index)'
        >
          -
        </Button>
      </div>
    </div>

    <Button
      @click='store.addUser'
      variant='none'
      :class='$style.addButton'
    >
      Add
    </Button>
    <NuxtLink to='/farting'>
      <Button
        fill
        variant='primary'
        :class='$style.submitButton'
        :disabled='!isUsersValid'
      >
        Let's fart*
      </Button>
    </NuxtLink>
    <div :class='$style.caption'>
      * Fart is an abbreviation for the phrase "Fair Cart" which is frequently used in Yerevan, Armenia
    </div>
  </div>
</template>

<style module>
.heading {
  font-weight: 600;
  color: var(--main);
  margin-bottom: 28px;
}
.fields {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
  box-sizing: border-box;
}
.fieldWrapper {
  width: 100%;
  gap: 12px;
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-flow: column;
  align-items: center;
}
.addButton {
  margin-top: 20px;
}
.submitButton {
  margin-top: 32px;
}
.caption {
  margin-top: 8px;
  font-size: 12px;
  color: var(--gray);
}
</style>