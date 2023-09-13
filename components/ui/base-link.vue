<script lang='ts' setup>
import { computed, useCssModule } from 'vue'

export type LinkThemes = 'light' | 'dark'

type BaseLinkProps = {
  theme?: LinkThemes
}
type BaseLinkEmits = {
  (e: 'click', event: MouseEvent): void
}

const style = useCssModule()

const emit = defineEmits<BaseLinkEmits>()
const props = withDefaults(defineProps<BaseLinkProps>(), {
	theme: 'dark',
})

const themeClass = computed(() => {
	switch (props.theme) {
	case ('light'):
		return style['light']
	case ('dark'):
	default:
		return ''
	}
})
</script>

<template>
	<div
		:class="[$style.baseLink, themeClass]"
		@click="(e) => emit('click', e)"
	>
		<slot />
	</div>
</template>

<style module>
.baseLink {
  display: inline;
  color: var(--black);
  text-decoration: underline;
  text-decoration-color: var(--main);
  font-weight: 300;
}
.baseLink:hover {
  color: var(--main);
  cursor: pointer;
}
.light {
  color: var(--white);
}
</style>