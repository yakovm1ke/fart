<script lang='ts' setup>
import { Purchase, User } from '@/stores/main';
import { getFormattedNumber } from '@/helpers';
import Button from './ui/button.vue';
import InputNumber from './ui/input-number.vue';
import Input from './ui/input.vue';
import Tag from './ui/tag.vue';
import { Ref } from 'vue';

export type PurchaseProps = {
  order: number
  purchase: Purchase
  users: User[]
}
export type PurchaseEmits = {
  (e: "changeTitle", title: string): void
  (e: "changeCost", cost: number | null): void
  (e: "toggleUser", user: User): void
  (e: "removePurchase"): void
}

const props = defineProps<PurchaseProps>()
const emit = defineEmits<PurchaseEmits>()
const purchaseTitleRef: Ref<typeof Input | null> = ref(null)
const costRef: Ref<typeof InputNumber | null> = ref(null)

const costPerPerson = computed(() => {
  const usersLength = props.purchase.users.length
  if (!usersLength) return 0
  return (props.purchase.cost ?? 0) / usersLength
})

function isUserSelected(id: string) {
  return props.purchase.users.some(user => user.id === id)
}

function handleKeydownOnTitle(event: KeyboardEvent) {
  if (event.key !== 'Enter') return

  costRef.value?.focus()
}

function focus() {
  purchaseTitleRef.value?.focus()
}

defineExpose({
  focus
})
</script>

<template>
  <div :class='$style.purchase'>
    <div :class='$style.header'>{{ order }}</div>
    <div :class='$style.content'>
      <Input
        ref='purchaseTitleRef'
        :value='purchase.title'
        placeholder='Purchase'
        @input='(title) => emit("changeTitle", title)'
        @keydown='handleKeydownOnTitle'
      />
      <InputNumber
        ref='costRef'
        placeholder='Cost'
        :value='purchase.cost'
        @input='(cost) => emit("changeCost", cost)'
      />
      <div :class='$style.tags'>
        <Tag
          v-for='(user, index) in users'
          :key='index'
          :label='user.name'
          :selected='isUserSelected(user.id)'
          @click='emit("toggleUser", user)'
        />
      </div>
      <div :class='$style.costPerPerson'>
        <div>Cost per person</div>
        <div :class='$style.cost'>{{ getFormattedNumber(costPerPerson) }}</div>
      </div>
      <Button
        :class='$style.removeButton'
        @click='emit("removePurchase")'
        variant='none'
      >
        Remove
      </Button>
    </div>
  </div>
</template>

<style module>
.purchase {
  width: 100%;
  box-sizing: border-box;
  border: var(--border);
  border-radius: 8px;
  overflow: hidden;
}
.header {
  display: flex;
  justify-content: center;
  padding: 10px;
  background: var(--main);
  color: var(--white);
  font-weight: 600;
  border-bottom: var(--border) var(--black);
}
.content {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.tags {
  width: 100%;
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}
.costPerPerson {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
}
.cost {
  font-weight: 600;
}
.removeButton {
  align-self: flex-start;
}
</style>