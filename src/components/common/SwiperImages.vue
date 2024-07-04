<template>
  <swiper-container
    class="swiper-container"
    :style="{
      '--swiper-navigation-color': '#464A51',
      '--swiper-pagination-color': '#464A51',
      '--swiper-navigation-size': '30px'
    }"
    :lazy="true"
    :pagination="{
      clickable: true,
    }"
    :navigation="isNavigationVisible"
    :rewind="true"
  >
    <swiper-slide v-for="image in images" :key="image.id" lazy="true">
      <img class="swiper-img" loading="lazy" :src="image.src" />
    </swiper-slide>
  </swiper-container>
</template>

<script>
import { register } from 'swiper/element/bundle';

register();

export default {
    name: 'SwiperImages',
    inject: ["mq"],
    props: {
      images: {
        type: Array,
        required: true
      }
    },
    computed: {
      isNavigationVisible() {
        return !['xxs'].some(screen => this.mq.current === screen);
      }
    }
}
</script>

<style lang="scss" scoped>
.swiper-img {
  max-width: 100%;
  max-height: 300px;
  @apply mx-auto mb-10;
  @screen md {
    max-height: 500px;
  }
}
</style>