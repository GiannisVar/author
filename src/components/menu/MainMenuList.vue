<template>
    <div class="main_menu_list">
        <template v-for="item in items" :key="item.id">
            <router-link class="link" @click="$emit('navigate')" :to="item.route" v-slot=" { navigate, isActive }">
                <MenuItem :label="item.label" :isButton="item.isButton" :active="isActive" @click="navigate" />
            </router-link>
        </template>
    </div>
</template>

<script>
import { MAIN_MENU_LIST_ITEMS } from '../../router/paths';
import MenuItem from './MenuItem';

export default {
  name: 'MainMenuList',
  components: { MenuItem },
  created() {
    this.items = MAIN_MENU_LIST_ITEMS;
  },
}
</script>