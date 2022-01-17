<template>
  <section id="navArea">
    <nav class="navbar navbar-inverse" role="navigation">
      <div class="navbar-header">
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar"> <span class="sr-only">Toggle navigation</span> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span> </button>
      </div>
      <div id="navbar" class="navbar-collapse collapse">
        <ul class="nav navbar-nav main_nav">
          <li class="active">
            <nuxt-link to="/">
              <span class="fa fa-home desktop-home"></span><span class="mobile-show">Home</span>
            </nuxt-link>
          </li>
          <li v-for="nav in navs" :key="nav.id">
            <nuxt-link :to="`/competitions/${nav.id}`">
              {{ nav.name }}
            </nuxt-link>
          </li>
        </ul>
      </div>
    </nav>
  </section>
</template>
<script>
export default {
  data() {
    return {
      navs: [],
      name: ['Premier League', 'UEFA Champions League', 'Ligue 1', 'Bundesliga', 'Serie A', 'Primeira Liga']
    }
  },
  async fetch () {
    try {
      let params = {
        plan: 'TIER_ONE'
      }
      let res = await this.$axios.get('competitions', {params: params});
      this.navs = res.data.competitions.filter(c => this.name.includes(c.name));
    } catch (error) {
      console.log(error);
    }
  }
}
</script>