<script lang='ts' setup>
import BaseLink from './base-link.vue'

type LinkProps = {
  href: string
  target?: '_self' | '_blank' | '_parent' | '_top'
  rel?: string
}

const props = withDefaults(defineProps<LinkProps>(), {
	target: '_blank',
	rel: 'noreferrer noopener',
})
</script>

<template>
  <a
    :href='href'
    :target='target'
    :rel='rel'
  >
    <BaseLink>
      <slot></slot>
    </BaseLink>
  </a>
</template>