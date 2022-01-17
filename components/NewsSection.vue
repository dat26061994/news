<template>
  <section id="newsSection">
    <div class="row">
      <div class="col-lg-12 col-md-12">
        <div class="latest_newsarea">
          <!-- <span>Latest News</span> -->
          <div class="news_sticker" v-if="results">
            <VueSlickCarousel v-bind="settings">
              <div v-for="match in results.matches" :key="match.id" class="">
                <nuxt-link to="/">
                  <div class="match-bage">
                    {{ match.homeTeam.name }}
                    <span class="score">
                      {{ match.score.fullTime.homeTeam ? match.score.fullTime.homeTeam : 0 }} - {{ match.score.fullTime.awayTeam ? match.score.fullTime.awayTeam : 0 }}
                    </span>
                    {{ match.awayTeam.name }}
                  </div>
                </nuxt-link>
              </div>
            </VueSlickCarousel>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import Vue from 'vue'
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
// optional style for arrows & dots
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'

export default Vue.extend({
  name: 'NewsSection',
  components: { VueSlickCarousel },
  data() {
    return {
      settings: {
        "dots": false,
        "edgeFriction": 0.35,
        "infinite": true,
        "speed": 500,
        "slidesToShow": 4,
        "slidesToScroll": 1,
        "autoplaySpeed": 3000,
        autoplay: true,
        arrows: false,
      },
      results: null,
    }
  },
  async fetch() {
    try {
      let params = {
        dateFrom: '2022-01-08',
        dateTo: '2022-01-13',
      }
      const res = await this.$axios.$get('matches', {params: params});
      this.results = res;
    } catch (error) {
      console.log(error);
    }
  },
})
</script>
<style lang="css">
.match-bage {
  background-color: #fff;
  color: #000;
  margin: 5px;
  border-radius: 10px;
  text-align: center;
  padding: 5px;
  font-size: 12px;
}
.match-bage .score {
  background-color: #fca5a5;
  padding: 3px 5px;
  border-radius: 5px;
}
</style>