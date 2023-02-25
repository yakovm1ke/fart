<script lang='ts' setup>
import BaseLink, { LinkThemes } from './base-link.vue'

type NuxtLinkProps = {
  to: string
  theme?: LinkThemes
}

const props = defineProps<NuxtLinkProps>()
</script>

<template>
  <NuxtLink :to='props.to'>
    <BaseLink :theme='props.theme'>
      <slot></slot>
    </BaseLink>
  </NuxtLink>
</template>