<script setup lang='ts'>
import { Ref } from 'vue';

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

function handleInput(event: Event) {
  emit('input', (event.target as HTMLInputElement)?.value)
}

defineExpose({
  focus
})
</script>

<template>
  <div
    :class='$style.inputWrapper'
    @click='focus'
  >
    <slot name='beforeInput'></slot>
    <input
      ref='inputRef'
      :class='$style.input'
      :value="value"
      :placeholder="placeholder"
      @input="handleInput"
      @keydown='emit("keydown", $event)'
    />
    <slot name='afterInput'></slot>
  </div>
</template>

<style module>
.inputWrapper {
  width: 100%;
  box-sizing: border-box;
  padding: 8px;
  border-radius: 8px;
  gap: 8px;
  border: var(--border) var(--gray);
  display: flex;
  cursor: text;
}
.input {
  flex-grow: 1;
  border: none;
  outline: none;
  font-size: inherit;
  font-weight: inherit;
  font-family: inherit;
  padding: 0;
}
.inputWrapper:has(.input:focus-visible) {
  border-color: var(--main);
}
.input::placeholder {
  color: var(--gray);
}
</style>

