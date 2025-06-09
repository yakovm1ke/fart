// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	modules: [
		'@pinia/nuxt',
	],

	imports: {
		autoImport: false,
	},

	app: {
		baseURL: process.env.NODE_ENV === 'production' ? '/fart/' : '/',
		buildAssetsDir: '/_nuxt/',
	},
})
