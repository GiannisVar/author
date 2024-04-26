<template>
  <div class="main_app" :class="{ 'main_app-with-background': isHomepage }">
    <Transition name="opacity1">
      <div v-if="isLoading" class="loading_mask">
        <img :src="loaderImage" alt="loader" />
      </div>
    </Transition>
    <MqResponsive target="xs-">
      <Transition name="opacity2">
        <div v-if="isSideBarMenuOpen" class="mask"></div>
      </Transition>
    </MqResponsive>
    <div class="main_content">
      <MainHeader class="header" @open_sidebar="sidebarMenuHandler" @navigation="setLoader(true)"/>
      <MainContentWrapper @navigation="setLoader(true)" />
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
import LoaderImage from './assets/diversity-icon.svg';

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
      isLoading: false,
    }
  },
  created() {
    this.loaderImage = LoaderImage;
  },
  watch: { 
    isSideBarMenuOpen: function () {
      document.body.style.overflow = this.isSideBarMenuOpen ? 'hidden' : ''
    },
    isLoading: function () {
      document.body.style.overflow = this.isLoading ? 'hidden' : '';
      this.isLoading && setTimeout( () => { this.setLoader(false) }, 2000);
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
    },
    setLoader(state) { 
      this.isLoading = state;
    }
  },
}
</script>

<style lang="scss" scoped>
  .main_app {
    @apply flex w-full relative overflow-x-clip bg-nude;
    min-height: 100vh;
    .mask {
      @apply absolute w-screen h-screen opacity-80 bg-white z-10;
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
      }
    }
    .loading_mask {
      @apply absolute w-screen h-screen opacity-80 bg-white z-30;
      img {
        @apply absolute w-auto;
        top: 45%;
        left: 45%;
        height: 50px;
        animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: .5;
          }
        }
      }
    }
    .opacity1-enter-active,
    .opacity1-leave-active,
    .opacity2-enter-active,
    .opacity2-leave-active {
      transition: opacity 0.5s ease;
    }

    .opacity1-enter-from {
      opacity: 0.8;
    }
    .opacity1-leave-to,
    .opacity2-leave-to,
    .opacity2-enter-from {
      opacity: 0;
    }
    &-with-background {
      background:linear-gradient(0deg, rgba(254, 226, 226, 0.8), rgba(254, 226, 226, 0.9)), url('./assets/homepage_bg.png');
      background-size:cover;
    }
  }
</style>
