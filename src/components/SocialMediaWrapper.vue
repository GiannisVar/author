<template>
    <div class="social_list">
        <template v-for="item in items" :key="item.id">
            <font-awesome-icon class="social-icon" @click="redirectTo(item.prefix, item.path)" :icon="item.icon" />
        </template>
    </div>
</template>

<script>
import SOCIAL_MEDIA from '../constants/social-media';
import { library } from '@fortawesome/fontawesome-svg-core';
import { 
    faFacebook as fabFacebook, 
    faXTwitter as fabXTwitter, 
    faInstagram as fabInstagram,
    faLinkedin as fabLinkedin
 } from '@fortawesome/free-brands-svg-icons';

library.add(fabFacebook, fabXTwitter, fabInstagram, fabLinkedin)

export default {
    name: 'SocialMediaWrapper',
    created() {
        this.items = SOCIAL_MEDIA;
        this.isMobile = window.navigator.maxTouchPoints > 0;
    },
    methods: {
        redirectTo(prefix, path) {
          const target = this.isMobile ? '_self' : '_blank';
          const finalPath = `${this.isMobile ? prefix.mobile : prefix.desktop}${path}`;
          window.open(finalPath, target);
        },
    },
}
</script>

<style lang="scss" scoped>
.social_list {
    @apply flex justify-center;
    .social-icon {
        @apply mx-2 w-auto cursor-pointer;
        height: 1.5em;
        @screen sm {
            @apply mx-8;
            height: 1.75em;
        }
    }
}
</style>