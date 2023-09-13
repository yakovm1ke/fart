<script setup lang='ts'>
import { storeToRefs } from 'pinia'

import NuxtLink from '~/components/ui/nuxt-link.vue'
import { Page } from '~/models'
import { usePurchaseStore } from '~/stores'
import { getFormattedNumber } from '~/utils'

const purchasesStore = usePurchaseStore()
const { usersTotalCosts, totalCost } = storeToRefs(purchasesStore)
</script>

<template>
	<div :class="$style.wrapper">
		<div :class="$style.title">
			Final Fart
		</div>
		<div
			v-for="([user, userTotalCost]) in usersTotalCosts"
			:key="user.id"
			:class="$style.costRow"
		>
			<div>
				{{ user.name }}
			</div>
			<div :class="$style.cost">
				{{ getFormattedNumber(userTotalCost) }}
			</div>
		</div>
		<div :class="$style.separator" />
		<div :class="$style.costRow">
			<div :class="$style.cost">
				Total
			</div>
			<div :class="$style.cost">
				{{ getFormattedNumber(totalCost) }}
			</div>
		</div>
		<NuxtLink :to="{name: Page.Details}">
			Show details
		</NuxtLink>
	</div>
</template>

<style module>
.wrapper {
  border: var(--border);
  color: var(--black);
  border-radius: 12px;
  padding: 20px 32px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.title {
  font-weight: 600;
  color: var(--main);
  font-size: 24px;
}

.costRow {
  display: flex;
  justify-content: space-between;
  gap: 16px;
}

.separator {
  width: 100%;
  border-top: var(--border);
}

.cost {
  font-weight: 600;
}
</style>