<script lang='ts' setup>
import { Purchase, useMainStore, User } from '@/stores/main';
import { storeToRefs } from 'pinia';
import UserPurchaseDetails from '@/components/user-purchase-details.vue';

const router = useRouter()
const store = useMainStore()
const {users, purchases} = storeToRefs(store)

if (!users.value.length) {
  router.push('/')
}

function getUserPurchases(user: User): Purchase[] {
  return purchases.value.filter(purchase => purchase.users.some(purchaseUser => purchaseUser.id === user.id))
}
function getUserTotalCost(user: User) {
  return store.usersTotalCosts[user.id] ?? 0
}
</script>

<template>
  <NuxtLink
    to='/farting'
    :class='$style.link'
  >
    Go to farting
  </NuxtLink>
  <div :class='$style.users'>
    <UserPurchaseDetails
      v-for='user in users'
      :key='user.id'
      :user='user'
      :purchases='getUserPurchases(user)'
      :total-cost='getUserTotalCost(user)'
    />
  </div>
</template>

<style module>
.link {
  color: var(--black);
  text-decoration-color: var(--main);
  font-weight: 300;
}
.users {
  margin-top: 28px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
}
</style>