import { nanoid } from 'nanoid'
import {defineStore} from 'pinia'

export type User = {
  id: string
  name: string
}

export type Purchase = {
  title: string
  cost: number | null
  users: User[]
}

export const createUser = (name: string): User => ({
  id: nanoid(),
  name,
})

export const createPurchase = (): Purchase => ({
  cost: null,
  title: '',
  users: [],
})

export const useMainStore = defineStore('main', {
  state: (): {users: User[], purchases: Purchase[]} => ({
    users: [createUser(''), createUser('')],
    purchases: [createPurchase()],
  }),
  actions: {
    addUser() {
      this.users.push(createUser(''))
    },
    deleteUser(index: number) {
      this.users.splice(index, 1)
    },
    addPurchase() {
      this.purchases.push(createPurchase())
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
      this.purchases = [createPurchase()]
    }
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
  }
})