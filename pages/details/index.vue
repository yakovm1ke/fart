<script lang='ts' setup>
import { Purchase, useMainStore, User } from '@/stores/main'
import { storeToRefs } from 'pinia'
import UserPurchaseDetails from '@/components/user-purchase-details.vue'
import { getFormattedNumber } from '~/helpers'
import { useRouter } from 'vue-router'
import { useHead } from 'unhead'

const router = useRouter()
const store = useMainStore()
const {users, purchases, isUsersValid} = storeToRefs(store)

useHead({
	title: 'Details',
})

if (!isUsersValid.value) {
	router.push('/farting')
}

function getUserPurchases(user: User): Purchase[] {
	return purchases.value.filter(purchase => purchase.users.some(purchaseUser => purchaseUser.id === user.id))
}
function getUserTotalCost(user: User) {
	return store.usersTotalCosts[user.id] ?? 0
}
</script>

<template>
  <UiNuxtLink to='/farting'>
    Go to farting
  </UiNuxtLink>
  <div :class='$style.users'>
    <UserPurchaseDetails
      v-for='user in users'
      :key='user.id'
      :user='user'
      :purchases='getUserPurchases(user)'
      :total-cost='getUserTotalCost(user)'
    />
  </div>
  <div :class='$style.total'>
    <span :class='$style.totalTitle'>Total: </span>
    <span>{{ getFormattedNumber(store.totalCost) }}</span>
  </div>
</template>

<style module>
.total {
  margin-top: 28px;
  font-size: 24px;
}
.totalTitle {
  font-weight: 600;
}
.link {
  color: var(--black);
  text-decoration-color: var(--main);
  font-weight: 300;
}
.users {
  margin-top: 28px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 20px;
}
</style>