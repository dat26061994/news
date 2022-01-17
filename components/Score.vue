<template>
  <div class="single_post_content">
    <h2><span>Score</span></h2>
    <iframe src="https://www.scorebat.com/embed/livescore/" frameborder="0" width="100%" allowfullscreen allow='autoplay; fullscreen' style="width:100%;height:1200px;overflow:hidden;display:block;" class="_scorebatEmbeddedPlayer_"></iframe>
    <!-- <div>
      <hr class="my-2">
      <ul class="text-center">
        <li @click="getMatchs(d.value)" class="inline-block px-4" :class="{ 'text-red-600': d.value === day }" v-for="d in days" :key="d.name">
          <p class="text-center mb-0">{{ d.name }}</p>
          <p v-if="d.day" class="text-center">{{ d.day }}</p>
        </li>
      </ul>
      <hr class="my-2">
    </div>
    <div class="matches-container w-3/4 mx-auto">
      <div class="py-5" v-for="(matches, key) in groups" :key="key">
        <div class="flex justify-between py-3">
          <div class="flex" v-if="getCompetition(key)">
            <img :src="getCompetition(key).area.ensignUrl" :alt="getCompetition(key).name" style="width: 40px; height: 30px;" width="40" height="30">
            <div class="ml-3">
              <div>{{ getCompetition(key).name }}</div>
              <div>{{ getCompetition(key).area.name }}</div>
            </div>
          </div>
          <div>
            <i class="fa fa-chevron-right" aria-hidden="true"></i>
          </div>
        </div>
        <div>
          <div v-for="match in matches" class="match-score row flex mx-0 my-3 items-center w-full" :key="match.id">
            <div class="col-md-1">
              <strong>
                {{ match.score.penalties.homeTeam ? 'PEN' : match.score.extraTime.homeTeam ? 'ET' : match.score.fullTime.homeTeam ? 'FT' : 'HT'  }}
              </strong>
            </div>
            <div class="my-3 col-md-11">
              <div class="flex items-center justify-between">
                <div>
                  {{ match.homeTeam.name }}
                </div>
                <div v-if="match.score">
                  <strong v-if="match.score.penalties.homeTeam">
                    {{ match.score.penalties.homeTeam }}
                  </strong>
                  <strong v-else-if="match.score.extraTime.homeTeam">
                    {{ match.score.extraTime.homeTeam }}
                  </strong>
                  <strong v-else-if="match.score.fullTime.homeTeam">
                    {{ match.score.fullTime.homeTeam }}
                  </strong>
                  <strong v-else>
                    {{ match.score.halfTime.homeTeam }}
                  </strong>
                </div>
              </div>
              <div class="flex items-center justify-between">
                <div>
                  {{ match.awayTeam.name }}
                </div>
                <div>
                  <strong v-if="match.score.penalties.awayTeam">
                    {{ match.score.penalties.awayTeam }}
                  </strong>
                  <strong v-else-if="match.score.extraTime.awayTeam">
                    {{ match.score.extraTime.awayTeam }}
                  </strong>
                  <strong v-else-if="match.score.fullTime.awayTeam">
                    {{ match.score.fullTime.awayTeam }}
                  </strong>
                  <strong v-else>
                    {{ match.score.halfTime.awayTeam }}
                  </strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> -->
  </div>
</template>
<script>
import _ from 'lodash';

export default {
  name: 'Score',
  data() {
    return {
      days: [
        {
          day: '',
          name: 'Live',
          value: this.$moment(new Date()).format('YYYY-MM-DD'),
        },
        {
          day: this.$moment(new Date()).subtract(2, 'days').format("Do MMM"),
          name: this.$moment(new Date()).subtract(2, 'days').format("ddd"),
          value: this.$moment(new Date()).subtract(2, 'days').format('YYYY-MM-DD'),
        },
        {
          day: this.$moment(new Date()).subtract(1, 'days').format("Do MMM"),
          name: this.$moment(new Date()).subtract(1, 'days').format("ddd"),
          value: this.$moment(new Date()).subtract(1, 'days').format('YYYY-MM-DD'),
        },
        {
          day: this.$moment(new Date()).format("Do MMM"),
          name: 'Today',
          value: this.$moment(new Date()).format('YYYY-MM-DD'),
        },
        {
          day: this.$moment(new Date()).add(1, 'days').format("Do MMM"),
          name: this.$moment(new Date()).add(1, 'days').format("ddd"),
          value: this.$moment(new Date()).add(1, 'days').format('YYYY-MM-DD'),
        },
        {
          day: this.$moment(new Date()).add(2, 'days').format("Do MMM"),
          name: this.$moment(new Date()).add(2, 'days').format('ddd'),
          value: this.$moment(new Date()).add(2, 'days').format('YYYY-MM-DD'),
        },
        {
          day: '',
          name: 'Calendar',
          value: this.$moment(new Date()).format('YYYY-MM-DD'),
        },
      ],
      day: this.$moment(new Date()).format('YYYY-MM-DD'),
      competitions: [],
      matches: [],
      matchesData: [],
      groups: [],
    }
  },
  methods: {
    getCompetition (id) {
      return this.competitions.find(c => c.id == id)
    },
    async getMatchs (day) {
      this.day = day
      let params = {
        dateFrom: day,
        dateTo: day
      }
      let matchesRes = await this.$axios.get('matches', {params: params});
      this.matchesData = matchesRes.data.matches;
      this.matches = this.matchesData.map(m => {
        return {
          ...m,
          competition: m.competition.id
        }
      })
      this.groups = _.groupBy(this.matches, 'competition');
      this.competitions = this.matchesData.map(m => m.competition);
    }
  },
  // async fetch () {
  //   try {
  //     let params = {
  //       dateFrom: this.$moment(new Date()).format('YYYY-MM-DD'),
  //       dateTo: this.$moment(new Date()).format('YYYY-MM-DD')
  //     }
  //     let matchesRes = await this.$axios.get('matches', {params: params});
  //     this.matchesData = matchesRes.data.matches;
  //     this.matches = this.matchesData.map(m => {
  //       return {
  //         ...m,
  //         competition: m.competition.id
  //       }
  //     })
  //     this.groups = _.groupBy(this.matches, 'competition');
  //     this.competitions = this.matchesData.map(m => m.competition);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
}
</script>
<style lang="css">
.match-score {
  padding: 20px;
  background-color: #ccc;
  border-radius: 10px;
  margin: 10px 0px;
}
.matches-container {
  padding: 10px;
  background-color: #f3f4f6;
}
</style>