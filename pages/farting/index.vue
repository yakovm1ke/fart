<script lang='ts' setup>
import { useMainStore } from '@/stores'
import Purchase from '@/components/purchase.vue'
import { storeToRefs } from 'pinia'
import { getFormattedNumber } from '@/helpers'
import { Ref } from 'vue'
import { useHead } from 'unhead'
import { useRouter } from 'vue-router'
import {ref, onMounted} from 'vue'
import { nextTick } from 'vue'

const router = useRouter()
const store = useMainStore()
const { users, purchases, isUsersValid } = storeToRefs(store)
const purchasesRefs: Ref<InstanceType<typeof Purchase>[]> = ref([])

if (!isUsersValid.value) {
	router.push('/')
}

async function handlePurchaseAdd() {
	store.addPurchase()
	await nextTick()
	purchasesRefs.value?.[purchasesRefs.value.length - 1]?.focus()
}

useHead({
	title: 'Farting',
})

onMounted(() => {
	purchasesRefs.value[0]?.focus()
})
</script>

<template>
  <div :class='$style.container'>
    <div :class='$style.purchases'>
      <Purchase
        ref='purchasesRefs'
        v-for='(purchase, index) in purchases'
        :key='index'
        :order='index + 1'
        :purchase='purchase'
        :users='users'
        @change-cost='(cost) => store.setCost(index, cost)'
        @change-title='(title) => store.setTitle(index, title)'
        @toggle-user='(user) => store.toggleUser(index, user)'
        @remove-purchase='store.deletePurchase(index)'
      />
      <button
        :class='$style.addPurchaseButton'
        @click='handlePurchaseAdd'
      >
        Add purchase
      </button>
    </div>

    <div :class='$style.infoBlock'>
      <div :class='$style.title'>
        FINAL FART
      </div>
      <div
        :class='$style.costRow'
        v-for='(user, index) in users'
        :key='index'
      >
        <div>
          {{ user.name }}
        </div>
        <div :class='$style.cost'>
          {{ getFormattedNumber(store.usersTotalCosts[user.id]) }}
        </div>
      </div>
      <div :class='$style.separator'></div>
      <div :class='$style.costRow'>
        <div :class='$style.cost'>
          Total
        </div>
        <div :class='$style.cost'>{{ getFormattedNumber(store.totalCost) }}</div>
      </div>
      <UiNuxtLink to='/details'>
        Show details
      </UiNuxtLink>
    </div>

    <div :class='$style.bottomBar'>
      <div :class='$style.costRow'>
        <div :class='$style.cost'>
          Total
        </div>
        <div :class='$style.cost'>
          {{ getFormattedNumber(store.totalCost) }}
        </div>
      </div>
      <UiNuxtLink to="/details">
        Show details
      </UiNuxtLink>
    </div>
  </div>
</template>

<style module>
.container {
  display: flex;
  gap: 20px;
  align-items: flex-start;
  padding-bottom: 60px;
}
.purchases {
  flex-grow: 1;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 16px;
}
.addPurchaseButton {
  font-size: inherit;
  font-weight: 600;
  font-family: inherit;
  width: 100%;
  min-height: 280px;
  border: 2px dashed var(--gray);
  background: transparent;
  color: var(--gray);
  border-radius: 12px;
  outline: none;
}
.addPurchaseButton:focus-visible {
  border-color: var(--black);
  color: var(--black);
}
.addPurchaseButton:hover {
  cursor: pointer;
  border-color: var(--black);
  color: var(--black);
}
.infoBlock {
  border: var(--border);
  position: sticky;
  top: 32px;
  color: var(--black);
  width: 240px;
  border-radius: 12px;
  padding: 20px 32px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.separator {
  width: 100%;
  border-top: var(--border);
}
.costRow {
  display: flex;
  justify-content: space-between;
  gap: 12px;
}
.link {
  color: var(--black);
  text-decoration-color: var(--main);
  font-weight: 300;
}
.cost {
  font-weight: 600;
}
.title {
  font-weight: 600;
  color: var(--main);
  font-size: 24px;
}
.bottomBar {
  display: none;
}

@media screen and (max-width: 860px) {
  .infoBlock {
    display: none;
  }
  .bottomBar {
    display: block;
    position: fixed;
    bottom: 0;
    left: 0;
    padding: 20px 32px;
    box-sizing: border-box;
    border-top: var(--border);
    background: var(--lightGray);
    width: 100%;
    cursor: pointer;
  }
}
</style>