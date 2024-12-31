<script lang='ts' setup>
import copy from 'copy-to-clipboard'
import html2canvas from 'html2canvas'
import { storeToRefs } from 'pinia'
import { useHead } from 'unhead'

import { definePageMeta } from '#imports'
import DetailsUserPurchases from '~/components/details/details-user-purchases.vue'
import Button from '~/components/ui/button.vue'
import NuxtLink from '~/components/ui/nuxt-link.vue'
import { Page } from '~/models'
import { Purchase, User } from '~/models'
import { usePurchaseStore, useUserStore } from '~/stores'
import { downloadFile, getFormattedNumber } from '~/utils'

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

function captureScreen() {
	const captureElement = document.body
	if (!captureElement) return
	html2canvas(captureElement).then((canvas) => {
		const imageUrl = canvas.toDataURL('image/png')
		downloadFile(imageUrl, `Fart-${new Date().toLocaleDateString()}.png`)
	})
}

function getDetails(withDetails: boolean) {
	const userPurchaseMap = new Map<User, Purchase[]>([])

	purchases.value.forEach((purchase) => {
		const users = purchase.users
		users.forEach((user) => {
			userPurchaseMap.set(user, [...userPurchaseMap.get(user) || [], purchase])
		})
	})

	const list = Array.from(purchaseStore.usersTotalCosts.entries().map(([user, totalCost]) => {
		const userList = [`${user.name} (${getFormattedNumber(totalCost)})`]

		if (withDetails) {
			const details = userPurchaseMap.get(user)?.map((purchase) => {
				return `— ${purchase.title} — ${getFormattedNumber((purchase.cost || 0) / purchase.users.length)}`
			})

			userList.push(...details || [])
		}

		return userList
	}))

	return [
		`Fart: ${new Date().toLocaleDateString()} — ${new Date().toLocaleTimeString()}\n\n`,
		...[...list.map((it) => {
			return it.join('\n')
		})].map((it, index, { length }) => (index === length - 1) ? it : `${it}\n\n`),
	].join('')
}

function copyResult(withDetails: boolean) {
	copy(getDetails(withDetails))
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

	<div :class="$style.actions">
		<Button
			v-if="totalCost"
			:class="$style.screenshotButton"
			@click="() => copyResult(false)"
		>
			Copy simple
		</Button>

		<Button
			v-if="totalCost"
			:class="$style.screenshotButton"
			variant="dark"
			@click="() => copyResult(true)"
		>
			Copy with details
		</Button>

		<Button
			v-if="totalCost"
			:class="$style.screenshotButton"
			variant="light"
			@click="captureScreen"
		>
			Save screenshot
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