<template>
  <div class="about_page">
    <div class="bio">
      <img :src="author" class="author" />
      <p>{{ $t('aboutPage.bio') }}</p>
    </div>
    <div class="moments">
      <h2 class="title">{{ $t('aboutPage.titleGR') }}</h2>
      <SwiperImages :images="greekSwiperImages" />
    </div>
    <div class="moments">
      <h2 class="title">{{ $t('aboutPage.titleCA') }}</h2>
      <SwiperImages :images="canadianSwiperImages" />
    </div>
  </div>
</template>

<script>
import SwiperImageModel from '../../models/SwiperImageModel';
import Author from '../../assets/author.png';
import CA1 from '../../assets/swiper/ca/ca1.png';
import CA2 from '../../assets/swiper/ca/ca2.png';
import CA3 from '../../assets/swiper/ca/ca3.png';
import CA4 from '../../assets/swiper/ca/ca4.png';
import GR1 from '../../assets/swiper/gr/gr1.png';
import GR2 from '../../assets/swiper/gr/gr2.png';
import GR3 from '../../assets/swiper/gr/gr3.png';
import GR4 from '../../assets/swiper/gr/gr4.png';
import SwiperImages from '../common/SwiperImages';

const CANADIAN_IMAGES = [
  CA1,
  CA2,
  CA3,
  CA4
];

const GREEK_IMAGES = [
  GR1,
  GR2,
  GR3,
  GR4
];

export default {
  name: 'AboutPage',
  components: { SwiperImages },
  data() {
    return {
      canadianSwiperImages: [],
      greekSwiperImages: [],
    }
  },
  created() {
    this.author = Author;
    CANADIAN_IMAGES.forEach((value,key) => {
      this.canadianSwiperImages.push(new SwiperImageModel({id: key, src: value}));
    });
    GREEK_IMAGES.forEach((value,key) => {
      this.greekSwiperImages.push(new SwiperImageModel({id: key, src: value}));
    });
  }
}
</script>

<style lang="scss" scoped>
.about_page {
  .bio {
    @apply inline-block;
    .author {
      @apply object-contain mx-auto pb-6 h-auto;
      width: 300px;
      @screen sm {
        @apply float-left pb-4 pr-6;
      }
    }
  }
  .moments {
    @apply my-6;
    .title {
      @apply text-base font-bold pb-8;
    }
  }
}
</style>
