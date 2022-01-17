<template>
  <div class="single_post_content" v-if="videos && videos.length > 0">
    <h2><span>News</span></h2>
    <div class="single_post_content_left">
      <ul class="business_catgnav  wow fadeInDown">
        <li>
          <figure class="bsbig_fig">
            <div v-html="videos[0].videos[0].embed"></div>
            <div class="row">
              <div class="col-md-4" v-for="v in videos[0].videos.filter((vid, i) => i !== 0)" :key="v.title">
                <div v-html="v.embed"></div>
              </div>
            </div>
            <figcaption>
              <a href="pages/single_page.html">
                {{ videos[0].title }}
              </a>
            </figcaption>
            <p>
              {{ videos[0].competition }}
            </p>
          </figure>
        </li>
      </ul>
    </div>
    <div class="single_post_content_right">
      <ul class="spost_nav">
        <li v-for="(video, i) in videos" :key="video.title">
          <div class="media wow fadeInDown" v-if="i !== 0">
            <nuxt-link :to="video.title" class="media-left">
              <img :alt="video.title" :src="video.thumbnail">
            </nuxt-link>
            <div class="media-body">
              <a href="pages/single_page.html" class="catg_title">
                {{ video.title }}
              </a>
              <p>{{ video.competition }}</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      videos: []
    }
  },
  async mounted() {
    let params = {
      limit: 4
    }
    let res = await fetch(
        'https://www.scorebat.com/video-api/v3/'
      ).then(res => res.json());
    this.videos = res.response;
    this.videos.length = 5;
  },
  // async fetch () {
  //   try {
  //     // this.$axios.setBaseURL(process.env.BASE_URL_VIDEO);
  //     let res = await this.$axios.get('https://www.scorebat.com/video-api/v3/');
  //     this.videos = res.data.response;
  //     console.log('this.videos', this.videos);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
}
</script>