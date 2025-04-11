<template>
  <div class="modal">
    <div class="header">
      <font-awesome-icon :icon="['fas','x']" @click="closeModal" class="close-button" />
    </div>
    <div class="content">
      <slot />
    </div>
  </div>
</template>

<script>
import { faX as fasX } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

library.add(fasX);
export default {
  // eslint-disable-next-line
  name: 'Modal',
  methods: {
    closeModal() {
      this.$emit('closeModal');
    },
  }
}
</script>

<style scoped lang="scss">
.modal {
  @apply fixed bg-nude-darker flex flex-col rounded-sm;
  transform: translate(-50%, 0);
  z-index: 100;
  height: 50vh;
  width: 75%;
  top: 20%;
  left: 50%;
  .header {
    @apply ml-auto px-2 py-1;
    .close-button {
      @apply cursor-pointer;
      font-size: 0.75em;
      &:hover {
        color: aliceblue;
      }
    }
  }
  .content {
    @apply bg-white h-full p-2;
    margin: 0 0.5em 0.5em 0.5em;
    overflow-x: auto;
  }
}
</style>