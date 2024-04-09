<template>
  <div class="main_app" :class="{ 'main_app-with-background': isHomepage }">
    <MqResponsive target="xs-">
      <div v-if="isSideBarMenuOpen" class="mask"></div>
    </MqResponsive>
    <div class="main_content">
      <MainHeader class="header" @open_sidebar="sidebarMenuHandler"/>
      <MainContentWrapper />
      <SocialMediaWrapper class="footer"/>
    </div>
  </div>
</template>

<script>
import { MqResponsive } from 'vue3-mq';
import MainHeader from './components/MainHeader';
import SocialMediaWrapper from './components/SocialMediaWrapper';
import MainContentWrapper from './components/MainContentWrapper';
import { PAGES } from './router/paths';

export default {
  name: 'App',
  components: { 
    MqResponsive, 
    MainHeader, 
    SocialMediaWrapper, 
    MainContentWrapper 
  },
  data() {
    return {
      isSideBarMenuOpen: false,
    }
  },
  watch: { 
    isSideBarMenuOpen: function () {
      document.body.style.overflow = this.isSideBarMenuOpen ? 'hidden' : ''
    }
  },
  computed: {
    isHomepage() {
      return this.$route.path === PAGES.HOMEPAGE.route;
    }
  },
  methods: {
    sidebarMenuHandler(isOpen) {
      this.isSideBarMenuOpen = isOpen;
    }
  },
}
</script>

<style lang="scss" scoped>
  .main_app {
    @apply flex w-full relative overflow-x-clip bg-nude;
    min-height: 100vh;
    .mask {
      @apply absolute w-screen h-screen opacity-80 bg-white;
    }
    .main_content {
      @apply flex flex-col w-full px-6 opacity-100;
      @screen sm {
        @apply px-12;
      }
      .header {
        @apply py-6;
      }
      .footer {
        @apply py-8 mt-auto;
        @screen md {
          @apply py-16;
        }
      }
    }
    &-with-background {
      background:linear-gradient(0deg, rgba(254, 226, 226, 0.8), rgba(254, 226, 226, 0.9)), url('~@/assets/homepage_bg.png');
      background-size:cover;
    }
  }
</style>
