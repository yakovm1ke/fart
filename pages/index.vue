<script setup lang='ts'>
import { definePageMeta, useHead } from '#imports'
import UsersForm from '~/components/users/users-form.vue'
import { usePurchaseStore } from '~/stores'

useHead({
	title: 'FART',
})

definePageMeta({
	middleware: () => {
		usePurchaseStore().reset()
	},
})
</script>

<template>
	<UsersForm />
</template>
