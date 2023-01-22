<script setup lang='ts'>
export type ButtonVariants = 'primary' | 'circle' | 'none'
export type ButtonProps = {
  fill?: boolean
  variant?: ButtonVariants
  disabled?: boolean
}
const props = withDefaults(defineProps<ButtonProps>(), {
  disabled: false,
  variant: 'primary',
  fill: false
})

const emit = defineEmits(['click'])
const style = useCssModule()

const variantClass = computed(() => {
  switch(props.variant) {
    case('primary'):
      return style['primary']
    case('circle'):
      return style['circle']
    case('none'):
      return
  }
})
</script>

<template>
  <button
    @click="emit('click')"
    :class='[fill && $style.fill, $style.button, variantClass]'
    :disabled='disabled'
  >
    <slot></slot>
  </button>
</template>

<style module>
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
.circle {
  background: var(--black);
  width: 20px;
  height: 20px;
  border-radius: 32px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  color: white;
}
.circle:disabled {
  background: var(--gray);
  cursor: not-allowed;
}
.primary {
  background: var(--main);
  padding: 16px;
  border-radius: 8px;
  color: #fff;
}
.primary:disabled {
  background: var(--gray);
  cursor: not-allowed;
}
</style>