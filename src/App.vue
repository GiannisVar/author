<template>
  <div class="main_app" :class="{ 'main_app-with-background': isHomepage }">
    <div v-if="isLoading" class="loading_mask">
      <img :src="loaderImage" alt="loader" />
    </div>
    <MqResponsive target="xs-">
      <div v-if="isSideBarMenuOpen" class="mask"></div>
    </MqResponsive>
    <div class="main_content">
      <MainHeader class="header" @open_sidebar="sidebarMenuHandler" @navigation="setLoader(true)"/>
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
        @apply absolute top-1/2 left-1/2;
        width: 50px;
        height: 50px;
        animation: bounce 1s infinite;

        @keyframes bounce {
          0%, 100% {
            transform: translateY(-25%);
            animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
          }
          50% {
            transform: translateY(0);
            animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
          }
        }
      }
    }
    &-with-background {
      background:linear-gradient(0deg, rgba(254, 226, 226, 0.8), rgba(254, 226, 226, 0.9)), url('./assets/homepage_bg.png');
      background-size:cover;
    }
  }
</style>
