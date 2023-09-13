<script setup lang='ts'>
import { storeToRefs } from 'pinia'

import NuxtLink from '~/components/ui/nuxt-link.vue'
import { usePurchaseStore } from '~/stores'
import { getFormattedNumber } from '~/utils'
import { Page } from '~/utils'

const { totalCost } = storeToRefs(usePurchaseStore())
</script>

<template>
	<div :class="$style.container">
		<div :class="$style.costRow">
			<div :class="$style.cost">
				Total
			</div>
			<div :class="$style.cost">
				{{ getFormattedNumber(totalCost) }}
			</div>
		</div>

		<NuxtLink
			:to="{
				name: Page.Details
			}"
		>
			Show details
		</NuxtLink>
	</div>
</template>

<style module>
.container {
  padding: 20px 32px;
  box-sizing: border-box;
  border-top: var(--border);
  background: var(--lightGray);
  width: 100%;
}

.costRow {
	display: flex;
	justify-content: space-between;
	font-weight: 600;
}
</style>