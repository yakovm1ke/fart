<script lang='ts' setup>
type BaseLinkEmits = {
  (e: 'click', event: MouseEvent): void
}
const emit = defineEmits<BaseLinkEmits>()
</script>

<template>
  <div
    @click="(e) => emit('click', e)"
    :class='$style.baseLink'
  >
    <slot></slot>
  </div>
</template>

<style module>
.baseLink {
  display: inline;
  color: var(--black);
  text-decoration: underline;
  text-decoration-color: var(--main);
  font-weight: 300;
}
.baseLink:hover {
  color: var(--main);
  cursor: pointer;
}
</style>