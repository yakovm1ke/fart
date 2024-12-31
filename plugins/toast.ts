import 'vue3-toastify/dist/index.css'

import Vue3Toastify, { toast } from 'vue3-toastify'

import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.vueApp.use(Vue3Toastify, { autoClose: 3000 })

	return {
		provide: { toast },
	}
})