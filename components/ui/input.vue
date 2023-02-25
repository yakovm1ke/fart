<script setup lang='ts'>
import { Ref, ref } from 'vue'
import BaseInput from './base-input.vue'

export type InputProps = {
  value: string
  placeholder?: string
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
    :value='props.value'
    :placeholder='props.placeholder'
    @input='value => emit("input", value)'
    @keydown='emit("keydown", $event)'
    ref='inputRef'
  >
    <template #after>
      <slot name='after'></slot>
    </template>
    <template #before>
      <slot name='before'></slot>
    </template>
  </BaseInput>
</template>
