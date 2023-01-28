<script setup lang='ts'>
export type TagProps = {
  label: string
  selected: boolean
}
const props = defineProps<TagProps>()
const emit = defineEmits(['click'])
</script>


<template>
  <button
    tabindex='0'
    :class='[$style.tag, selected && $style.selected]'
    @click='emit("click")'
  >
    {{ label }}
  </button>
</template>

<style module>
.tag {
  padding: 8px 24px;
  color: var(--black);
  border: var(--border) var(--gray);
  border-radius: 8px;
  background: transparent;
  font-weight: inherit;
  font-size: inherit;
  font-family: inherit;
  outline: none;
}
.tag:focus-visible {
  border-color: var(--black);
}
.tag.selected:focus-visible {
  border-style: dashed;
}
.tag:hover {
  cursor: pointer;
  filter: brightness(0.96);
}
.tag:active {
  transform: translateY(2px);
}
.selected {
  background: var(--main);
  color: var(--white);
  border-color: var(--black);
}
</style>