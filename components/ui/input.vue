<script setup lang='ts'>
import { defineEmits } from 'vue';

export type InputProps = {
  value: string
  placeholder?: string
}
export type InputEmits = {
  (e: 'input', value: string): void
}

const props = defineProps<InputProps>()
const emit = defineEmits<InputEmits>()

function handleInput(event: Event) {
  emit('input', (event.target as HTMLInputElement)?.value)
}
</script>

<template>
  <input
    :class='$style.input'
    :value="value"
    :placeholder="placeholder"
    @input="handleInput"
  />
</template>

<style module>
.input {
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid var(--black);
  outline: none;
  font-size: inherit;
  font-weight: inherit;
  font-family: inherit;
}
.input:active,
.input:focus {
  border-color: var(--main);
}
.input::placeholder {
  color: var(--gray);
}
</style>

