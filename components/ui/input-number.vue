<script lang='ts' setup>
import IMask, { InputMask } from 'imask'
import { Ref } from 'vue'

export type InputNumberProps = {
  value: number | null
  placeholder?: string
  max?: number
  min?: number
}
export type InputNumberEmits = {
  (e: 'input', value: number | null): void
}

const inputRef: Ref<HTMLInputElement | null> = ref(null)
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
    inputRef.value.value = String(props.value)
    numberMask = IMask(inputRef.value, numberMaskOptions);
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
</script>

<template>
  <input
    ref='inputRef'
    :class='$style.input'
    :value='numberMask?.value'
    :placeholder='placeholder'
    @keyup='handleInput'
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
