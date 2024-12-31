<script lang='ts' setup>
import { storeToRefs } from 'pinia'
import { useHead } from 'unhead'
import { toast } from 'vue3-toastify'

import { definePageMeta, getCopyString } from '#imports'
import DetailsUserPurchases from '~/components/details/details-user-purchases.vue'
import Button from '~/components/ui/button.vue'
import NuxtLink from '~/components/ui/nuxt-link.vue'
import { Page } from '~/models'
import { Purchase, User } from '~/models'
import { usePurchaseStore, useUserStore } from '~/stores'
import { getFormattedNumber } from '~/utils'

useHead({
	title: 'Details',
})

definePageMeta({
	middleware: [
		'is-users-filled',
	],
})

const purchaseStore = usePurchaseStore()
const usersStore = useUserStore()

const { users } = storeToRefs(usersStore)
const { totalCost, purchases, usersTotalCosts } = storeToRefs(purchaseStore)

function getUserPurchases(user: User): Purchase[] {
	return purchases
		.value
		.filter((it) => it.users.some(({ id }) => id === user.id))
}

function getUserTotalCost(user: User) {
	return usersTotalCosts.value.get(user) ?? 0
}

function copyResult(ignoreDetails: boolean) {
	try {
		navigator.clipboard.writeText(getCopyString(purchaseStore.purchases, ignoreDetails))
		toast.success('Successfully copied')
	} catch (e) {
		let message = 'Something went wrong'

		if (e instanceof Error) {
			message = e.message || message
		}

		toast.error(`Failed to copy\n${message}`)
	}
}
</script>

<template>
	<div>
		<NuxtLink
			:to="{
				name: Page.Farting,
			}"
		>
			Back to farting
		</NuxtLink>

		<div :class="$style.users">
			<DetailsUserPurchases
				v-for="user in users"
				:key="user.id"
				:user="user"
				:purchases="getUserPurchases(user)"
				:total-cost="getUserTotalCost(user)"
			/>
		</div>
		<div :class="$style.total">
			<span :class="$style.totalTitle">Total: </span>
			<span>{{ getFormattedNumber(totalCost) }}</span>
		</div>
	</div>

	<div
		v-if="totalCost"
		:class="$style.actions"
	>
		<Button
			:class="$style.screenshotButton"
			@click="() => copyResult(false)"
		>
			Copy all
		</Button>

		<Button
			:class="$style.screenshotButton"
			variant="dark"
			@click="() => copyResult(true)"
		>
			Copy totals only
		</Button>
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
.users {
  margin-top: 28px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 20px;
}

.actions {
	margin-top: 32px;
	display: flex;
	flex-wrap: wrap;
	gap: 8px;
}
</style>