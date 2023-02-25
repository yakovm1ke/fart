<script lang='ts' setup>
import { useMainStore } from '@/stores/main'
import Purchase from '~~/components/purchase.vue'
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
const purchasesRefs: Ref<typeof Purchase[]> = ref([])

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
    <div :class='$style.heading'>
      FARTING...
    </div>
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
    <div :class='$style.finalFart'>
      <div :class='$style.heading'>FINAL FART</div>
      <div
        :class='$style.costRow'
        v-for='(user, index) in users'
        :key='index'
      >
        <UiNuxtLink
          :class='$style.link'
          :to='`/details/${user.id}`'
        >
          {{ user.name }}
        </UiNuxtLink>
        <div :class='$style.cost'>
          {{ getFormattedNumber(store.usersTotalCosts[user.id]) }}
        </div>
      </div>
      <div :class='$style.costRow'>
        <UiNuxtLink
          :class='$style.link'
          to='/details'
        >
          <div :class='$style.cost'>
            Total
          </div>
        </UiNuxtLink>
        <div :class='$style.cost'>{{ getFormattedNumber(store.totalCost) }}</div>
      </div>
    </div>
</template>

<style module>
.heading {
  font-weight: 600;
  color: var(--main);
}
.purchases {
  margin-top: 28px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 16px;
}
.addPurchaseButton {
  font-size: inherit;
  font-weight: 600;
  font-family: inherit;
  width: 100%;
  min-height: 302px;
  border: 2px dashed var(--gray);
  background: transparent;
  color: var(--gray);
  border-radius: 8px;
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
.finalFart {
  margin-top: 28px;
  display: flex;
  flex-direction: column;
  gap: 16px;
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
</style>