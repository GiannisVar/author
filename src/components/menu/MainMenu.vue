<template>
    <div class="main_menu">
        <MqResponsive target="sm+">
            <MainMenuList class="main_menu-list" @navigate="$emit('navigation')" />
        </MqResponsive>
        <MqResponsive target="xs-" class="sidebar_menu">
            <font-awesome-icon v-if="!isSideBarMenuOpen" :icon="['fas', 'bars']" @click="sideBarChangeStatus" class="burger-icon"/>
            <transition name="slide">
                <div v-if="isSideBarMenuOpen" v-click-outside="sideBarChangeStatus" class="sidebar">
                    <font-awesome-icon :icon="['fas','x']" @click="sideBarChangeStatus" class="close-button" />
                    <MainMenuList class="sidebar-list" @navigate="navigateHandler" />
                </div>
            </transition>
        </MqResponsive>
    </div>
</template>

<script>
import { MqResponsive } from 'vue3-mq';
import { faBars as fasBars, faX as fasX } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import MainMenuList from './MainMenuList';

library.add(fasBars, fasX);

export default {
  name: 'MainMenu',
  components: { MqResponsive, MainMenuList },
  data() {
    return {
        isSideBarMenuOpen: false,
    }
  },
  methods: {
    sideBarChangeStatus() {
        this.isSideBarMenuOpen = !this.isSideBarMenuOpen;
        this.$emit('open_sidebar_menu', this.isSideBarMenuOpen);
    },
    navigateHandler() {
        this.sideBarChangeStatus();
        this.$emit('navigation');
    }
  }
}
</script>

<style lang="scss" scoped>
.main_menu {
    @apply flex z-20 items-center;
    &-list {
        :deep(.menu_item) {
            @apply px-3;
        }
    }
    .sidebar_menu {
        @apply ml-auto;
        .burger-icon {
            @apply cursor-pointer;
        }
        .sidebar {
            @apply flex flex-col fixed top-0 right-0 h-screen w-1/2 p-3 justify-start overflow-y-auto bg-nude;
            max-width: 12em;
            z-index:1;
            @screen xs {
                @apply w-2/5;
            }
            @screen sm {
                @apply w-1/3;
            }
            .close-button {
                @apply cursor-pointer ml-auto mr-4 mt-8;
            }
            .sidebar-list {
                @apply flex flex-col mt-8;
                :deep(.link) {
                    @apply py-3 ml-auto mr-auto;
                }
                :deep(.main_menu_language_switcher) {
                    @apply pt-12 ml-auto mr-auto;
                }
            }
        }
        .slide-enter {
            transform: translateX(200px);
        }
        .slide-enter-from,
        .slide-leave-to {
            transform: translateX(200px);
            opacity: 0;
        }
        .slide-enter-active, 
        .slide-leave-active {
            transition: all 0.5s ease-out;
        }
    }
}
</style>