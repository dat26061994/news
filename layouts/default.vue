<template>
  <div class="container">
    <Header />
    <NewsSection />
    <section id="contentSection">
      <div class="row">
        <div class="col-lg-8 col-md-8 col-sm-8">
          <div class="left_content">
            <Nuxt />
          </div>
        </div>
        <div class="col-lg-4 col-md-4 col-sm-4">
          <aside class="right_content">
            <Standing />
          </aside>
        </div>
      </div>
    </section>
    <Footer />
  </div>
</template>
<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import Standing from '@/components/Standing.vue'
import NewsSection from '@/components/NewsSection.vue'

export default {
  components: {
    Header,
    Footer,
    Standing,
    NewsSection
  }
}
</script>