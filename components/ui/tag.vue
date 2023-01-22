<script setup lang='ts'>
export type TagProps = {
  label: string
  selected: boolean
}
const props = defineProps<TagProps>()
const emit = defineEmits(['click'])
</script>


<template>
  <div
    :class='[$style.tag, selected && $style.selected]'
    @click='emit("click")'
  >
    {{ label }}
  </div>
</template>

<style module>
.tag {
  padding: 8px 24px;
  color: var(--black);
  border: 1px solid var(--black);
  border-radius: 8px;
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
}
</style>