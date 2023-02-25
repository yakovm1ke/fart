<script lang='ts' setup>
import BaseLink from './base-link.vue'

type NuxtLinkProps = {
  to: string
}

const props = defineProps<NuxtLinkProps>()
</script>

<template>
  <NuxtLink :to='to'>
    <BaseLink>
      <slot></slot>
    </BaseLink>
  </NuxtLink>
</template>