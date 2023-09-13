<script lang='ts' setup>
import BaseLink, { LinkThemes } from './base-link.vue'
import { RouteLocationRaw } from '.nuxt/vue-router'

type NuxtLinkProps = {
  to: RouteLocationRaw
  theme?: LinkThemes
}

const props = defineProps<NuxtLinkProps>()
</script>

<template>
	<NuxtLink :to="props.to">
		<BaseLink :theme="props.theme">
			<slot />
		</BaseLink>
	</NuxtLink>
</template>