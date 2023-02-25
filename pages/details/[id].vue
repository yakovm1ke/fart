<script lang='ts' setup>
import { useMainStore } from '@/stores/main'
import { storeToRefs } from 'pinia'
import { useRouter, useRoute } from 'vue-router'
import { computed } from 'vue'
import { useHead } from 'unhead'

const store = useMainStore()
const router = useRouter()
const route = useRoute()
const { users, purchases } = storeToRefs(store)

const userId = Array.isArray(route.params['id']) ? route.params['id'][0] : route.params['id']

const user = users.value.find(user => user.id === userId)
const userPurchases = purchases.value
	.filter(purchase => purchase.users.some(user => user.id === userId))

useHead({
	title: user?.name,
})

if (!user) {
	router.push('/farting')
}

const userTotalCost = computed(() => {
	return store.usersTotalCosts[userId] ?? 0
})
</script>

<template>
  <UiNuxtLink
    to='/farting'
    :class='$style.link'
  >
    Go to farting
  </UiNuxtLink>
  <UserPurchaseDetails
    v-if='user'
    :class='$style.fartingDetails'
    :purchases='userPurchases'
    :user='user'
    :total-cost='userTotalCost'
  />
</template>

<style module>
.heading {
  font-weight: 600;
  color: var(--main);
}
.link {
  color: var(--black);
  text-decoration-color: var(--main);
}
.fartingDetails {
  margin-top: 28px;
}
.purchases {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.cost {
  font-weight: 600;
}
</style>