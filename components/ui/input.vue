<script setup lang='ts'>
import { Ref, ref } from 'vue'

import BaseInput from './base-input.vue'

export type InputProps = {
  value: string
  placeholder?: string
  autofocus?: boolean
}

export type InputEmits = {
  (e: 'input', value: string): void
  (e: 'keydown', event: KeyboardEvent): void
}

const inputRef: Ref<HTMLInputElement | null> = ref(null)
const props = defineProps<InputProps>()
const emit = defineEmits<InputEmits>()

function focus() {
	inputRef.value?.focus()
}

defineExpose({
	focus,
	inputRef,
})
</script>

<template>
	<BaseInput
		ref="inputRef"
		:value="props.value"
		:placeholder="props.placeholder"
		:autofocus="props.autofocus"
		@input="value => emit(&quot;input&quot;, value)"
		@keydown="emit(&quot;keydown&quot;, $event)"
	>
		<template #after>
			<slot name="after" />
		</template>
		<template #before>
			<slot name="before" />
		</template>
	</BaseInput>
</template>
