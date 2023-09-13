import { defineNuxtRouteMiddleware, navigateTo } from '#imports'
import { Page } from '~/models'
import { useUserStore } from '~/stores'

export default defineNuxtRouteMiddleware(() => {
	const userStore = useUserStore()
	if (!userStore.isUsersFilled) {
		return navigateTo({
			name: Page.Index,
		})
	}
})