<template>
  <div class="row">
    <div class="col-lg-12 col-md-12 col-sm-12">
      <div v-if="competition && area && currentSeason" class="flex">
        <div v-if="area" class="flex items-center justify-center">
          <img :src="area.ensignUrl" :alt="area.name" width="40">
        </div>
        <div class="ml-5">
          <h4 class="mb-0">{{ competition.name }}</h4>
          <p>{{ area.name }}</p>
        </div>
        <div class="ml-10 flex items-center justify-center">
          <select class="form-control" v-model="currentSeason" @change="onChangeSeason">
            <option v-for="season in competition.seasons" :key="season.id" :value="season">
              {{ $moment(season.startDate).format('YYYY') }} - {{ $moment(season.endDate).format('YYYY') }}
            </option>
          </select>
        </div>
      </div>
      <hr>
      <div v-if="inComming && inComming.length > 0" class="col log-12 col-md-12 col-sm-12 col-xs-12">
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Time</th>
              <th class="text-center">Match</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="match in inComming" :key="match.id">
              <td>
                {{ $moment(match.utcDate).format('YYYY/MM/DD HH:ss') }}
              </td>
              <td>
                <div class="text-center">
                  <nuxt-link :to="`/teams/${match.homeTeam.id}`">
                    {{ match.homeTeam.name }}
                  </nuxt-link>
                  -
                  <nuxt-link :to="`/teams/${match.awayTeam.id}`">
                    {{ match.awayTeam.name }}
                  </nuxt-link>
                </div>
              </td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="col log-12 col-md-12 col-sm-12 col-xs-12 mt-5">
        <h3>FINISHED</h3>
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Time</th>
              <th class="text-center">Match</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="match in finished" :key="match.id">
              <td>
                {{ $moment(match.utcDate).format('YYYY/MM/DD hh:ss') }}
              </td>
              <td>
                <div class="text-center flex items-center justify-center">
                  <div class="text-right" style="width: 200px;">
                    <nuxt-link :to="`/teams/${match.homeTeam.id}`">
                      {{ match.homeTeam.name }}
                    </nuxt-link>
                  </div>
                  <div class="score">
                    {{ match.score.fullTime.homeTeam ? match.score.fullTime.homeTeam : 0 }} - {{ match.score.fullTime.awayTeam ? match.score.fullTime.awayTeam : 0 }}
                  </div>
                  <div class="text-left" style="width: 200px;">
                    <nuxt-link :to="`/teams/${match.awayTeam.id}`">
                      {{ match.awayTeam.name }}
                    </nuxt-link>
                  </div>
                </div>
              </td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    id: {
      type: String,
    }
  },
  data() {
    return {
      competition: null,
      area: null,
      currentSeason: null,
      matches: null,
      finished: null,
      unFinished: null,
      inComming: null,
      times: [
        this.$moment(new Date()).format('YYYY/MM/DD'),
        this.$moment(new Date()).add(1, 'days').format('YYYY/MM/DD'),
        this.$moment(new Date()).add(2, 'days').format('YYYY/MM/DD'),
      ]
    }
  },
  async mounted() {
    
  },
  methods: {
    async onChangeSeason() {
      try {
        console.log(this.currentSeason);
        let paramsMatchs = {
          season: this.$moment(this.currentSeason.startDate).format('YYYY')
        }
        let resMatchs = await this.$axios.get(`competitions/${this.$route?.params?.id}/matches`, {params: paramsMatchs});
        this.matches = resMatchs.data.matches;
        this.finished = this.matches.filter(m => m.status === 'FINISHED').reverse();
        this.unFinished = this.matches.filter(m => m.status !== 'FINISHED');
        this.inComming = this.matches.filter(m => this.times.includes(this.$moment(m.utcDate).format('YYYY/MM/DD')) && m.status !== 'FINISHED')
      } catch (error) {
        console.log(error);
      }
    }
  },
  async fetch() {
    try {
      let res = await this.$axios.get(`competitions/${this.$route?.params?.id}`);
      let competition = res.data;
      let resArea = await this.$axios.get(`areas/${competition?.area?.id}`);
      let area = resArea.data;
      let currentSeason = competition.currentSeason;
      let paramsMatchs = {
        season: this.$moment(currentSeason.startDate).format('YYYY')
      }
      let resMatchs = await this.$axios.get(`competitions/${this.$route?.params?.id}/matches`, {params: paramsMatchs});
      this.matches = resMatchs.data.matches;
      this.finished = this.matches.filter(m => m.status === 'FINISHED').reverse();
      this.unFinished = this.matches.filter(m => m.status !== 'FINISHED');
      this.inComming = this.matches.filter(m => this.times.includes(this.$moment(m.utcDate).format('YYYY/MM/DD')) && m.status !== 'FINISHED')
      this.competition = competition;
      this.area = area;
      this.currentSeason = currentSeason;
    } catch (error) {
      console.log(error);
    }
  },
}
</script>
<style lang="css">
.score {
  background-color: #fca5a5;
  padding: 3px 5px;
  border-radius: 5px;
  width: 50px;
  margin: 0px 5px;
}
</style>