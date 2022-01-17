<template>
  <div class="row">
    <div class="col-lg-12 col-md-12 col-sm-12">
      <div class="left_content">
        <Video />
        <Score />
      </div>
    </div>
  </div>
</template>
<script>
import Score from '@/components/Score.vue'
import Video from '@/components/Video.vue'

export default {
  name: 'ContentSection',
  components: {
    Score,
    Video,
  },
  data() {
    return {
      competitions: [
        {
          id: '2016',
          name: 'Championship'
        },
        {
          id: '2021',
          name: 'Premier League'
        },
        {
          id: '2015',
          name: 'Ligue 1'
        },
        {
          id: '2002',
          name: 'Bundesliga'
        },
        {
          id: '2019',
          name: 'Serie A'
        },
        {
          id: '2014',
          name: 'LaLiga Santander'
        },
      ],
      competition: '2021',
      standings: null,
    }
  },
  async fetch () {
    try {
      let params = {
      }
      let resStandings = await this.$axios.get(`competitions/2021/standings`);
      this.standings = resStandings.data.standings;
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    async loadStandings () {
      console.log(this.competition);
      try {
        let res = await this.$axios.get(`competitions/${this.competition}/standings`);
        this.standings = res.data.standings;
        this.$forceUpdate();
      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>