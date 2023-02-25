<script setup lang='ts'>
import { Ref, ref } from 'vue'

type BaseInputProps = {
  value: string
  placeholder?: string
}
type BaseInputEmits = {
  (e: 'input', value: string): void
  (e: 'keydown', event: KeyboardEvent): void
  (e: 'keyup', event: KeyboardEvent): void
}

const inputRef: Ref<HTMLInputElement | null> = ref(null)

const props = defineProps<BaseInputProps>()
const emit = defineEmits<BaseInputEmits>()

function focus() {
	inputRef.value?.focus()
}

function handleInput(event: Event) {
	emit('input', (event.target as HTMLInputElement)?.value)
}

defineExpose({
	focus,
	inputRef,
})
</script>

<template>
  <div
    :class='$style.inputWrapper'
    @click='focus'
  >
    <slot name='before'></slot>
    <input
      ref='inputRef'
      :class='$style.input'
      :value="props.value"
      :placeholder="props.placeholder"
      @input="handleInput"
      @keydown='emit("keydown", $event)'
      @keyup='emit("keyup", $event)'
    />
    <slot name='after'></slot>
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
  background: transparent;
}
.inputWrapper:hover,
.inputWrapper:has(.input:focus-visible) {
  border-color: var(--main);
}
.input::placeholder {
  color: var(--gray);
}
</style>
