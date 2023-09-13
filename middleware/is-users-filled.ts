import { defineNuxtRouteMiddleware, navigateTo, Page } from '#imports'
import { useUserStore } from '~/stores'

export default defineNuxtRouteMiddleware(() => {
	const userStore = useUserStore()
	if (!userStore.isUsersFilled) {
		return navigateTo({
			name: Page.Index,
		})
	}
})