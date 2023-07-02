import { User } from '~/utils'

export interface Purchase {
  title: string
  cost: number | null
  users: User[]
}

export function createEmptyPurchase(): Purchase {
	return {
		cost: null,
		title: '',
		users: [],
	}
}