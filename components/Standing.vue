<template>
  <div class="single_sidebar">
    <h2><span>Standings</span></h2>
    <div class="my-3">
      <select class="form-control" v-model="competition" @change="loadStandings">
        <option v-for="c in competitions" :key="c.id" :value="c.id">
          {{ c.name }}
        </option>
      </select>
    </div>
    <p v-if="$fetchState.pending">Loading...</p>
    <p v-else-if="$fetchState.error">Error :(</p>
    <div v-else>
      <table class="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>TEAM</th>
            <th>P</th>
            <th>GD</th>
            <th>PTS</th>
          </tr>
        </thead>
        <tbody v-if="standings && standings[0]">
          <tr v-for="st in standings[0].table" :key="st.position">
            <td>{{ st.position }}</td>
            <td>{{ st.team.name }}</td>
            <td>{{ st.playedGames }}</td>
            <td>{{st.goalDifference}}</td>
            <td>{{ st.points }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>

export default {
  name: 'ContentSection',
  components: {
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
  mounted() {
    console.log(this.$route);
  },
  async fetch () {
    try {
      let params = {
      }
      let id = '2021'
      if (this.$route.name.includes('competitions')) {
        id = this.$route.params?.id || '2021'
      }
      let resStandings = await this.$axios.get(`competitions/${id}/standings`);
      this.standings = resStandings.data.standings;
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    async loadStandings () {
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