import {defineStore} from 'pinia'

import { User, Purchase, createEmptyPurchase, createEmptyUsers, createUser } from '~/utils'

export const useMainStore = defineStore('main', {
	state: (): {users: User[], purchases: Purchase[]} => ({
		users: createEmptyUsers(2),
		purchases: [createEmptyPurchase()],
	}),
	actions: {
		addUser() {
			this.users.push(createUser(''))
		},
		deleteUser(index: number) {
			this.users.splice(index, 1)
		},
		addPurchase() {
			this.purchases.push(createEmptyPurchase())
		},
		deletePurchase(index: number) {
			this.purchases.splice(index, 1)
		},
		toggleUser(purchaseIndex: number, toggledUser: User) {
			const userIndex = this.purchases[purchaseIndex].users
				.findIndex(user => user.id === toggledUser.id)

			if (userIndex >= 0) {
				this.purchases[purchaseIndex].users.splice(userIndex, 1)
			} else {
				this.purchases[purchaseIndex].users.push(toggledUser)
			}
		},
		setCost(purchaseIndex: number, cost: number | null) {
			this.purchases[purchaseIndex].cost = cost
		},
		setTitle(purchaseIndex: number, title: string) {
			this.purchases[purchaseIndex].title = title
		},
		resetStore() {
			this.users = [createUser(''), createUser('')]
			this.purchases = [createEmptyPurchase()]
		},
	},
	getters: {
		isUsersValid: (state) => state.users.every(user => !!user.name.trim() && !!user.id.length),
		totalCost: (state) => state.purchases.reduce((totalPrice, currPurchase) => totalPrice + (currPurchase.cost ?? 0), 0),
		usersTotalCosts: (state) => {
			const usersCostsMap: Record<string, number> = {}

			state.users.forEach(user => {
				usersCostsMap[user.id] = 0
			})

			state.purchases.forEach(purchase => {
				if (!purchase.users.length) return
				const costPerPerson = (purchase.cost ?? 0) / purchase.users.length
				purchase.users.forEach(user => {
					usersCostsMap[user.id] += costPerPerson
				})
			})

			return usersCostsMap
		},
	},
})