<template>
  <div class="book_page">
    <div class="initial-info">
      <MqResponsive target="xs-">
        <h2 class="subtitle">{{ $t('bookPage.subtitle1') }}</h2>
        <img :src="bookHeroes" class="book-heroes" />
      </MqResponsive>
      <MqResponsive target="sm+">
        <img :src="bookHeroes" class="book-heroes" />
        <h2 class="subtitle">{{ $t('bookPage.subtitle1') }}</h2>
      </MqResponsive>
      <div class="content" v-html="$t('bookPage.initialInfo')"></div>
    </div>
    <TextDivider />
    <div class="main-description">
      <img :src="book" class="book-cover" />
      <div class="description">
        <h2 class="subtitle">{{ $t('bookPage.subtitle2') }}</h2>
        <div class="content" v-html="$t('bookPage.description')"></div>
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
import BookHeroes from '../../assets/book_heroes.png';
import Book from '../../assets/book.png';

export default {
  name: 'BookPage',
  components: { TextDivider, MqResponsive },
  created() {
    this.bookHeroes = BookHeroes;
    this.book = Book;
  },
}
</script>

<style lang="scss" scoped>
.book_page {
  .initial-info {
    .subtitle {
      @apply text-xl font-bold pb-8;
    }
    .book-heroes {
      @apply object-contain mx-auto pb-12 h-auto;
      width: 300px;
      max-height: 300px;
      @screen sm {
        @apply float-right pb-2 pl-3;
      }
    }
    .content {
      font-size: 1.2rem;
      line-height: 1.75rem;
    }
  }
  .main-description {
    @apply flex flex-col w-full;
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
    .subtitle {
      @apply text-xl font-bold pb-8;
    }
    .description {
      @screen sm {
        @apply w-1/2;
      }
      .content {
        font-size: 1.2rem;
        line-height: 1.75rem;
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
