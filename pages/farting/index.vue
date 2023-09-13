<script lang='ts' setup>
import { useMediaQuery } from '@vueuse/core'
import { useHead } from 'unhead'

import { definePageMeta } from '#imports'
import PurchasesAbout from '~/components/purchases/purchases-about.vue'
import PurchasesBottomAbout from '~/components/purchases/purchases-bottom-about.vue'
import PurchasesList from '~/components/purchases/purchases-list.vue'
import { Middleware } from '~/models'

const isLargerScreen = useMediaQuery('(min-width: 860px)')

useHead({
	title: 'Farting',
})

definePageMeta({
	middleware: [
		Middleware.IsUsersFilled,
	],
})
</script>

<template>
	<div
		:class="[
			$style.page,
			!isLargerScreen && $style.pageWithBottom
		]"
	>
		<PurchasesList />
		<PurchasesAbout
			v-if="isLargerScreen"
			:class="$style.about"
		/>
		<PurchasesBottomAbout
			v-else
			:class="$style.bottom"
		/>
	</div>
</template>

<style module>
.page {
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 1fr;
  grid-auto-columns: minmax(auto, 240px);
  align-items: flex-start;
  gap: 20px;
}

.pageWithBottom {
	padding-bottom: 80px;
}

.about {
  position: sticky;
  top: 32px;
}

.bottom {
  position: fixed;
  bottom: 0;
  left: 0;
}
</style>