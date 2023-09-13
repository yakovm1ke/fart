<script setup lang='ts'>import { Ref } from 'vue'
import { computed, ref, useCssModule } from 'vue'

export type ButtonVariants = 'primary' | 'light' | 'dark'
export type ButtonSizes = 's' | 'm' | 'unwrapped'
export type ButtonProps = {
  fill?: boolean
  variant?: ButtonVariants
  size?: ButtonSizes
  disabled?: boolean
	type?: HTMLButtonElement['type']
}
const props = withDefaults(defineProps<ButtonProps>(), {
	disabled: false,
	variant: 'primary',
	fill: false,
	size: 'm',
	type: 'button',
})

const emit = defineEmits(['click'])
const style = useCssModule()

const buttonRef: Ref<HTMLButtonElement | null> = ref(null)

const sizeClass = computed(() => {
	switch (props.size) {
	case ('unwrapped'):
		return style['unwrapped']
	case ('s'):
		return style['small']
	case ('m'):
	default:
		return style['medium']
	}
})

const variantClass = computed(() => {
	switch (props.variant) {
	case ('light'):
		return style['light']
	case ('dark'):
		return style['dark']
	default:
	case ('primary'):
		return style['primary']
	}
})

function focus() {
	buttonRef.value?.focus()
}

defineExpose({
	focus,
})
</script>

<template>
	<button
		ref="buttonRef"
		:type="props.type"
		:class="[
			fill && $style.fill,
			$style.button,
			variantClass,
			sizeClass,
		]"
		:disabled="disabled"
		@click="emit('click')"
	>
		<slot />
	</button>
</template>

<style module>
:root {
  --mediumBorderRadius: 8px;
  --mediumPadding: 16px;
  --smallBorderRadius: 8px;
  --smallPadding: 8px;
}
.button {
  font-weight: 600;
  font-size: inherit;
  font-family: inherit;
  outline: none;
  border: none;
  background: none;
  color: var(--main);
  padding: 0;
}
.button:focus-visible {
  outline: var(--border) var(--gray);
}
.button:hover {
  cursor: pointer;
  filter: brightness(0.96);
}
.button:active {
  transform: translateY(2px);
}
.button:disabled:active {
  transform: none;
}
.fill {
  width: 100%;
}
.primary {
  background: var(--main);
  color: #fff;
}
.primary:disabled {
  background: var(--gray);
  cursor: not-allowed;
}
.light {
  background: var(--white);
  color: var(--black);
}
.dark {
  background: var(--black);
  color: var(--white);
}
.small {
  padding: var(--smallPadding);
  border-radius: var(--smallBorderRadius);
}
.medium {
  padding: var(--mediumPadding);
  border-radius: var(--mediumBorderRadius);
}
.unwrapped {
  background: transparent;
}
</style>