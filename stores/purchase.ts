import { defineStore } from 'pinia'
import { computed } from 'vue'
import { ref } from 'vue'

import { Purchase, User } from '~/models'
import { useUserStore } from '~/stores'
import { createEmptyPurchase } from '~/utils'

export const usePurchaseStore = defineStore('purchase', () => {
	const userStore = useUserStore()
	const purchases = ref<Purchase[]>([createEmptyPurchase()])

	const addEmptyPurchase = () => {
		purchases.value.push(createEmptyPurchase())
	}

	const deletePurchaseById = (deleteId: string) => {
		purchases.value = purchases
			.value
			.filter(({ id }) => id !== deleteId)
	}

	const deletePurchaseByIndex = (deleteIndex: number) => {
		purchases.value.splice(deleteIndex, 1)
	}

	const getPurchaseById = (purchaseId: string) => {
		return purchases.value.find(({ id }) => id === purchaseId)
	}

	const toggleUserApplyToPurchase = (purchaseId: string, user: User) => {
		const purchase = getPurchaseById(purchaseId)
		if (!purchase) return console.error('Error: Purchase wasn\'t found')
		const userIndex = purchase.users.indexOf(user)
		if (userIndex < 0) {
			purchase.users.push(user)
		} else {
			purchase.users.splice(userIndex, 1)
		}
	}

	const changePurchase = <
		TKey extends keyof Purchase,
		TValue extends Purchase[TKey],
	>(purchaseId: string, key: TKey, value: TValue) => {
		const purchase = getPurchaseById(purchaseId)
		if (!purchase) return console.error('Error: Purchase wasn\'t found')
		purchase[key] = value
	}

	const totalCost = computed(() => {
		return purchases.value.reduce((total, { cost }) => {
			return cost ? total + cost : total
		}, 0)
	})

	const usersTotalCosts = computed(() => {
		const costsMap = new Map<User, number>()

		userStore.users.forEach((it) => {
			costsMap.set(it, 0)
		})

		purchases.value.forEach(({ users, cost }) => {
			if (!users.length) return
			const costPerPerson = cost ? cost / users.length : 0
			users.forEach((user) => {
				const currCost = costsMap.get(user) ?? 0
				costsMap.set(user, currCost + costPerPerson)
			})
		})

		return costsMap
	})

	const reset = () => {
		purchases.value = [createEmptyPurchase()]
	}

	return {
		purchases,
		totalCost,
		usersTotalCosts,
		addEmptyPurchase,
		deletePurchaseById,
		deletePurchaseByIndex,
		toggleUserApplyToPurchase,
		changePurchase,
		reset,
	}
})