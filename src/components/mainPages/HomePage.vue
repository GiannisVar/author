<template>
  <div class="home_page">
    <transition name="vertical-slide" appear>
      <div class="home_page-main-section">
        <div class="home_page-main-section-title">
          <span>{{  $t('homePage.titleStart')  }}</span>
          <span>{{ $t('homePage.name') }}</span>
          <span>{{ $t('homePage.titleEnd') }}</span>
          <button class="home_page-main-section-button" @click="goToBookDetails">
            <span>{{ $t('buttons.learnMore') }}</span>
          </button>
        </div>
        <img :src="book" alt="book_homepage" class="home_page-main-section-img">
      </div>
    </transition>
  </div>
</template>

<script>
import Book from '../../assets/book_sample.png';
import { PAGES } from '../../router/paths';

export default {
  name: 'HomePage',
  created() {
    this.book = Book;
  },
  methods: {
    goToBookDetails() {
      this.$emit('navigate');
      this.$router.push({ name: PAGES.BOOK.name })
    }
  }
}
</script>

<style lang="scss" scoped>
.home_page {
  @apply w-full my-auto;
  &-main-section {
    @apply flex flex-col justify-center items-center;
    @screen sm {
        @apply flex-row;
    }
    gap: 3em;
    &-title {
      @apply flex flex-col whitespace-nowrap items-center;
       &> span {
        font-size: 1.25em;
        @screen xs {
          font-size: 1.75em;
        }
        @screen sm {
          font-size: 2em;
        }
      }
    }
    &-button {
      @apply px-4 py-1 bg-nude-dark rounded-full mt-4;
      &:hover {
        @apply bg-nude-darker;
      }
    }
    &-img {
      width: 8em;
      height: auto;
      @screen sm {
        width: 10em;
      }
    }
  }
  .vertical-slide-enter-active {
    transition: all 0.5s ease-out;
  }
  .vertical-slide-enter-from {
    transform: translateY(20px);
    opacity: 0;
  }
}
</style>
