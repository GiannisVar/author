<template>
  <div class="book_page">
    <div class="initial-info">
      <MqResponsive target="xs-">
        <h2 class="subtitle">{{ $t('bookPage.subtitle1') }}</h2>
        <img :src="bookHero" class="book-hero" />
      </MqResponsive>
      <MqResponsive target="sm+">
        <img :src="bookHero" class="book-hero" />
        <h2 class="subtitle">{{ $t('bookPage.subtitle1') }}</h2>
      </MqResponsive>
      <p v-html="$t('bookPage.initialInfo')"></p>
    </div>
    <TextDivider />
    <div class="main-description">
      <img :src="bookCover" class="book-cover" />
      <div class="description">
        <h2 class="subtitle">{{ $t('bookPage.subtitle2') }}</h2>
        <p v-html="$t('bookPage.description')"></p>
      </div>
    </div>
    <router-link class="redirect-link" to="purchase" @click="$emit('navigate')">
      <span class="link">{{ $t('links.buyBook') }}</span>
    </router-link>
  </div>
</template>

<script>
import { MqResponsive } from 'vue3-mq';
import TextDivider from '../common/TextDivider';
import BookHero from '../../assets/book_hero.png';
import BookCover from '../../assets/book_cover.jpg';

export default {
  name: 'BookPage',
  components: { TextDivider, MqResponsive },
  created() {
    this.bookHero = BookHero;
    this.bookCover = BookCover;
  },
  methods: {
    redirectToBuy() {
      this.$emit('navigation');
      this.$router.push({ name: 'purchase' });
    }
  }
}
</script>

<style lang="scss" scoped>
.book_page {
  .subtitle {
    @apply text-base font-bold pb-8;
  }
  .book-hero {
    @apply object-contain mx-auto pb-12 h-auto;
    width: 300px;
    @screen sm {
      @apply float-right pb-2 pl-3;
    }
  }
  .main-description {
    @apply flex flex-col;
    @screen sm {
      @apply flex-row;
    }
    .book-cover {
      @apply w-full object-contain pb-8;
      height: 300px;
      @screen sm {
        @apply w-1/2 p-12;
        height: 500px;
      }
    }
    .description {
      @screen sm {
        @apply w-1/2;
      }
    }
  }
  .redirect-link {
    @apply flex justify-center mx-auto my-6 w-fit;
    .link {
      @apply  text-lg underline cursor-pointer;
    }
  }
}
</style>
