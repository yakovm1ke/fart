<script lang='ts' setup>
import { computed, Ref, ref } from 'vue'

import Button from '~/components/ui/button.vue'
import Input from '~/components/ui/input.vue'
import InputNumber from '~/components/ui/input-number.vue'
import Tag from '~/components/ui/tag.vue'
import { Purchase, User } from '~/models'
import { getFormattedNumber } from '~/utils'

export type PurchaseProps = {
  order: number
  purchase: Purchase
  users: User[]
}
export type PurchaseEmits = {
  (e: 'changeTitle', title: string): void
  (e: 'changeCost', cost: number | null): void
  (e: 'toggleUser', user: User): void
  (e: 'removePurchase'): void
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
	return props.purchase.users.some((user) => user.id === id)
}

function handleKeydownOnTitle(event: KeyboardEvent) {
	if (event.key !== 'Enter') return

	costRef.value?.focus()
}

function focus() {
	purchaseTitleRef.value?.focus()
}

defineExpose({
	focus,
})
</script>

<template>
	<div :class="$style.purchase">
		<div :class="$style.header">
			<div :class="$style.counter">
				{{ order }}
			</div>
			<Button
				:class="$style.removeButton"
				variant="dark"
				size="unwrapped"
				@click="emit(&quot;removePurchase&quot;)"
			>
				Remove
			</Button>
		</div>
		<div :class="$style.content">
			<Input
				ref="purchaseTitleRef"
				:value="purchase.title"
				placeholder="Purchase"
				@input="(title) => emit(&quot;changeTitle&quot;, title)"
				@keydown="handleKeydownOnTitle"
			/>
			<InputNumber
				ref="costRef"
				placeholder="Cost"
				:value="purchase.cost"
				@input="(cost) => emit(&quot;changeCost&quot;, cost)"
			/>
			<div :class="$style.tags">
				<Tag
					v-for="(user, index) in users"
					:key="index"
					:label="user.name"
					:selected="isUserSelected(user.id)"
					@click="emit(&quot;toggleUser&quot;, user)"
				/>
			</div>
			<div :class="$style.costPerPerson">
				<div>Cost per person</div>
				<div :class="$style.cost">
					{{ getFormattedNumber(costPerPerson) }}
				</div>
			</div>
		</div>
	</div>
</template>

<style module>
.purchase {
  width: 100%;
  box-sizing: border-box;
  border: var(--border);
  border-radius: 12px;
  overflow: hidden;
}
.counter {
  color: var(--white);
  display: flex;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
}
.header {
  display: flex;
  background: var(--main);
  align-items: center;
  justify-content: space-between;
  padding: 12px 20px;
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
  gap: 8px;
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
</style>stores/purchases