<template>
    <div class="main_menu_list">
        <template v-for="item in items" :key="item.id">
            <router-link class="link" @click="$emit('navigate')" :to="item.route" v-slot=" { navigate, isActive }">
                <MenuItem :label="item.label" :isButton="item.isButton" :active="isActive" @click="navigate" />
            </router-link>
        </template>
        <LanguageSwitcher class="main_menu_language_switcher"/>
    </div>
</template>

<script>
import { MAIN_MENU_LIST_ITEMS } from '../../router/paths';
import MenuItem from './MenuItem';
import LanguageSwitcher from './LanguageSwitcher';

export default {
  name: 'MainMenuList',
  components: { MenuItem, LanguageSwitcher },
  created() {
    this.items = MAIN_MENU_LIST_ITEMS;
  },
}
</script>

<style lang="scss" scoped>
.main_menu_language_switcher {
  @apply ml-3;
}
</style>