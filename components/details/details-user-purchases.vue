<script lang='ts' setup>
import { computed } from 'vue'

import { Purchase, User } from '~/models'
import { getFormattedNumber } from '~/utils'

export type UserPurchaseProps = {
  user: User
  purchases: Purchase[]
  totalCost: number
}
const props = defineProps<UserPurchaseProps>()

const sortedPurchases = computed(() => {
	return [ ...props.purchases]
		.sort((a, b) => getCostPerPerson(b) - getCostPerPerson(a))
})

function getCostPerPerson(purchase: Purchase) {
	return (purchase.cost ?? 0) / (purchase.users.length || 1)
}

function getPurchaseParticipants(purchase: Purchase): User[] {
	return purchase.users.filter((user) => user.id !== props.user.id)
}
</script>

<template>
	<div :class="$style.userPurchaseDetails">
		<div :class="$style.name">
			{{ user.name }} <span v-if="totalCost">({{ getFormattedNumber(totalCost) }})</span>
		</div>
		<div :class="$style.purchases">
			<div
				v-if="!purchases.length"
				:class="$style.emptyFart"
			>
				Empty fart
			</div>
			<div
				v-for="purchase, index in sortedPurchases"
				:key="`purchase-${index}`"
				:class="$style.purchase"
			>
				<div :class="$style.purchaseName">
					{{ purchase.title }}
				</div>
				<div>{{ getFormattedNumber(getCostPerPerson(purchase)) }}</div>
				<div
					v-if="getPurchaseParticipants(purchase).length > 0"
					:class="$style.caption"
				>
					split with {{ getPurchaseParticipants(purchase).map(user => user.name).join(', ') }}
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
</style>stores/purchases