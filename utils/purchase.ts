import { nanoid } from 'nanoid'

import { Purchase } from '~/models'

export function createEmptyPurchase(): Purchase {
	return {
		id: nanoid(),
		cost: null,
		title: '',
		users: [],
	}
}