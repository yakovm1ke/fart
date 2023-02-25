<script lang='ts' setup>
import IMask, { InputMask } from 'imask'
import { Ref, ref, onMounted } from 'vue'
import BaseInput from './base-input.vue'

export type InputNumberProps = {
  value: number | null
  placeholder?: string
  max?: number
  min?: number
}
export type InputNumberEmits = {
  (e: 'input', value: number | null): void
}

const inputRef: Ref<typeof BaseInput | null> = ref(null)
const props = withDefaults(defineProps<InputNumberProps>(), {
	max: Number.MAX_SAFE_INTEGER,
	min: 0,
})
const emit = defineEmits<InputNumberEmits>()

const numberMaskOptions = {
	mask: Number,  // enable number mask

	scale: 2,  // digits after point, 0 for integers
	signed: false,  // disallow negative
	thousandsSeparator: ' ',  // any single char
	padFractionalZeros: false,  // if true, then pads zeros at end to the length of scale
	normalizeZeros: true,  // appends or removes zeros at ends
	radix: ',',  // fractional delimiter
	mapToRadix: ['.'],  // symbols to process as radix

	// additional number interval options (e.g.)
	min: props.min,
	max: props.max,
}

let numberMask: InputMask<typeof numberMaskOptions> | null = null

onMounted(() => {
	if (inputRef.value) {
		inputRef.value.inputRef.value = String(props.value)
		numberMask = IMask(inputRef.value.inputRef, numberMaskOptions)
	}
})

function handleInput() {
	const unmaskedValue = numberMask?.unmaskedValue
	if (!unmaskedValue || isNaN(parseFloat(unmaskedValue))) {
		emit('input', null)
		return
	}
	emit('input', parseFloat(unmaskedValue))
}

function focus() {
	inputRef.value?.focus()
}

defineExpose({
	focus,
})
</script>

<template>
  <BaseInput
    ref='inputRef'
    :value="numberMask?.value ?? ''"
    :placeholder='props.placeholder'
    @keyup='handleInput'
		inputmode='decimal'
  >
    <template #after>
      <slot name='after'></slot>
    </template>
    <template #before>
      <slot name='before'></slot>
    </template>
  </BaseInput>
</template>
