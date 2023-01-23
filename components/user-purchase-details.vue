<script lang='ts' setup>
import { Purchase, User } from '@/stores/main'
import { getFormattedNumber } from '@/helpers'

export type UserPurchaseProps = {
  user: User
  purchases: Purchase[]
  totalCost: number
}
const props = defineProps<UserPurchaseProps>()

function getCostPerPerson(purchase: Purchase) {
  return (purchase.cost ?? 0) / (purchase.users.length || 1)
}
</script>

<template>
  <div>
    <div :class='$style.name'>
      {{ user.name }}
    </div>
    <div :class='$style.purchases'>
      <div v-if='!purchases.length'>Empty fart</div>
      <div v-for='purchase in purchases'>
        {{ purchase.title }} - <span :class='$style.cost'>{{ getFormattedNumber(getCostPerPerson(purchase)) }}</span>
      </div>
      <div>
        <span :class='$style.cost'>Total</span> - <span :class='$style.cost'>{{ getFormattedNumber(totalCost) }}</span>
      </div>
    </div>
  </div>
</template>

<style module>
.name {
  font-weight: 600;
  color: var(--main);
}
.purchases {
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.cost {
  font-weight: 600;
}
</style>