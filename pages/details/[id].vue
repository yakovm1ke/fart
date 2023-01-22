<script lang='ts' setup>
import Button from '@/components/ui/button.vue'
import { getFormattedNumber } from '@/helpers';
import { Purchase, useMainStore } from '@/stores/main';
const store = useMainStore()
const router = useRouter()
const route = useRoute()
const userId = Array.isArray(route.params['id']) ? route.params['id'][0] : route.params['id']

const user = store.users.find(user => user.id === userId)
const userPurchases = store.purchases
  .filter(purchase => purchase.users.some(user => user.id === userId))

if (!user) {
  router.push('/farting')
}

function getCostPerPerson(purchase: Purchase) {
  return (purchase.cost ?? 0) / (purchase.users.length || 1)
}
</script>

<template>
  <NuxtLink
    to='/farting'
    :class='$style.link'
  >
    &lt; Back to farting
  </NuxtLink>
  <div :class='$style.fartingDetails'>
    <div :class='$style.heading'>
      {{ user?.name }}. Details
    </div>
    <div :class='$style.purchases'>
      <div v-if='!userPurchases.length'>
        Empty fart
      </div>
      <div v-for='purchase in userPurchases'>
        {{ purchase.title }} - <span :class='$style.cost'>{{ getFormattedNumber(getCostPerPerson(purchase)) }}</span>
      </div>
      <div>
        <span :class='$style.cost'>Total</span> - <span :class='$style.cost'>{{ getFormattedNumber(store.usersTotalCosts[userId]) }}</span>
      </div>
    </div>
  </div>
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