<script setup lang='ts'>
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'

import { nextTick } from '#imports'
import Purchase from '~/components/purchases/purchase.vue'
import { usePurchaseStore, useUserStore } from '~/stores'

const purchasesStore = usePurchaseStore()
const { changePurchase, deletePurchaseById, toggleUserApplyToPurchase } = purchasesStore
const { purchases } = storeToRefs(purchasesStore)
const userStore = useUserStore()

const purchasesRefs = ref<(InstanceType<typeof Purchase> | undefined)[]>([])

const handlePurchaseAdd = async() => {
	purchasesStore.addEmptyPurchase()
	await nextTick()
	purchasesRefs.value[purchases.value.length - 1]?.focus()
}

onMounted(() => {
	purchasesRefs.value[0]?.focus()
})
</script>

<template>
	<div :class="$style.wrapper">
		<Purchase
			v-for="(purchase, index) in purchases"
			ref="purchasesRefs"
			:key="purchase.id"
			:order="index + 1"
			:purchase="purchase"
			:users="userStore.users"
			@change-cost="changePurchase(purchase.id, 'cost', $event)"
			@change-title="changePurchase(purchase.id, 'title', $event)"
			@remove-purchase="deletePurchaseById(purchase.id)"
			@toggle-user="toggleUserApplyToPurchase(purchase.id, $event)"
		/>
		<button
			:class="$style.addButton"
			@click="handlePurchaseAdd()"
		>
			Add purchase
		</button>
	</div>
</template>

<style module>
.wrapper {
  width:100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 16px;
}

.addButton {
  all: unset;

  text-align: center;
  font-weight: 600;
  font-family: inherit;
  width: 100%;
  min-height: 280px;
  border: 2px dashed var(--gray);
	box-sizing: border-box;
  background: transparent;
  color: var(--gray);
  border-radius: 12px;
  outline: none;
}
.addButton:focus-visible {
  border-color: var(--black);
  color: var(--black);
}
.addButton:hover {
  cursor: pointer;
  border-color: var(--black);
  color: var(--black);
}
</style>