<template>
  <div>
    <ContentSection />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import NavArea from '@/components/NavArea.vue'
import ContentSection from '@/components/ContentSection.vue'
import NewsSection from '@/components/NewsSection.vue'
import SliderSection from '@/components/SliderSection.vue'

export default Vue.extend({
  name: 'IndexPage',
  layout: 'default',
  components: {
    NavArea,
    ContentSection,
    NewsSection,
    SliderSection
  },
  async asyncData({isDev, route, store, env, params, query, req, res, $axios, redirect, error}) {
    // try {
    //   let params = {
    //     sources: 'cnn',
    //     apiKey: process.env.BASE_API_KEY
    //   }
    //   const ip = await $axios.$get('v2/top-headlines', {params: params})
    //   return { ip }
    // } catch (error) {
    //   let ip = 123;
    //   console.log(error);
    //   return {ip}
    // }
  },
})
</script>
