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

function getPurchaseParticipants(purchase: Purchase): User[] {
	return purchase.users.filter(purchaseUser => purchaseUser.id !== props.user.id)
}
</script>

<template>
  <div :class='$style.userPurchaseDetails'>
    <div :class='$style.name'>
      {{ user.name }}
    </div>
    <div :class='$style.purchases'>
      <div
        v-if='!purchases.length'
        :class='$style.emptyFart'
      >
        Empty fart
      </div>
      <div
        :class='$style.purchase'
        v-for='purchase, index in purchases'
        :key='`purchase-${index}`'
      >
        <div :class='$style.purchaseName'>{{ purchase.title }}</div>
        <div>{{ getFormattedNumber(getCostPerPerson(purchase)) }}</div>
        <div
          :class='$style.caption'
          v-if='getPurchaseParticipants(purchase).length > 0'
        >
          split with {{ getPurchaseParticipants(purchase).map(user => user.name).join(', ') }}
        </div>
      </div>
      <div :class='$style.total' v-if='totalCost'>
        <div :class='$style.totalRow'>
          <div>Total</div>
          <div>{{ getFormattedNumber(totalCost) }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style module>
.userPurchaseDetails {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.purchase {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: flex;
  flex-direction: column;
}
.emptyFart {
  color: var(--gray);
}
.name {
  font-weight: 600;
  font-size: 28px;
  color: var(--black);
}
.purchases {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.purchaseName {
  font-weight: 600;
}
.total {
  display: flex;
  flex-grow: 1;
  align-items: flex-end;
}
.caption {
  font-size: 12px;
  color: var(--gray);
}
.totalRow {
  display: flex;
  justify-content: space-between;
  flex-grow: 1;
  font-weight: 600;
  border-top: var(--border);
  padding-top: 4px;
}
</style>