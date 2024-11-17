<template>
  <div class="main_content_wrapper">
    <h1 v-if="!isHomePage && !!routeNameTranslation" class="title">{{ routeNameTranslation }}</h1>
    <router-view @navigate="$emit('navigation')"/>
  </div>
</template>

<script>
export default {
  name: 'MainContentWrapper',
  props: {
    isHomePage: {
      type: Boolean,
    },
  },
  computed: {
    routeNameTranslation() {
      return this.$t(`mainTitle.${this.$route.name}`);
    }
  }
}
</script>

<style lang="scss" scoped>
.main_content_wrapper {
  @apply flex flex-col w-full h-full text-gray-500 py-8;
  .title {
    @apply text-center pb-4 text-2xl;
    &::after {
      @apply w-full block bg-black mt-1 opacity-30 mt-4;
      content: ' ';
      height: 1px;
    }
  }
}
</style>