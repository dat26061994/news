<template>
  <div class="row">
    <div class="col-lg-12 col-md-12 col-sm-12" v-if="team">
      <div class="flex items-center">
        <div class="flex-none" style="width: 60px;">
          <img width="100%" :src="team.crestUrl" alt="">
        </div>
        <div class="grow text-center">
          <h4>{{ team.name }}</h4>
          <!-- <p>Coach: <strong>{{ team. }}</strong> </p> -->
        </div>
        <div class="flex-none">
          {{ team.clubColors }}
        </div>
      </div>
      <div class="mt-5">
        <table class="table table-striped">
          <tbody>
            <tr>
              <td>Country</td>
              <td>{{ team.area.name }}</td>
            </tr>
            <tr>
              <td>Address</td>
              <td>{{ team.address }}</td>
            </tr>
            <tr>
              <td>Phone</td>
              <td>{{ team.phone }}</td>
            </tr>
            <tr>
              <td>Website</td>
              <td>
                <a :href="team.website">
                  {{ team.website }}
                </a>
              </td>
            </tr>
            <tr>
              <td>Stadium</td>
              <td>{{ team.venue }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="mt-5">
        <ul class="nav nav-tabs">
          <li :class="{ 'active': type === 'fixtures' }">
            <a href="javascript:void(0)" @click="type = 'fixtures'">
              FIXTURES
            </a>
          </li>
          <li :class="{ 'active': type === 'players' }">
            <a href="javascript:void(0)" @click="type = 'players'">
              PLAYERS
            </a>
          </li>
        </ul>
        <div class="tab-content">
          <div id="fixtures" :class="{ 'active': type === 'fixtures' }" class="tab-pane fade in">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Competition</th>
                  <th class="text-center">Match</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="match in matches" :key="match.id">
                  <td>
                    {{ $moment(match.utcDate).format('YYYY/MM/DD hh:ss') }}
                  </td>
                  <td>
                    {{ match.competition.name }}
                  </td>
                  <td>
                    <div class="text-center flex items-center justify-center">
                      <div class="text-right" style="width: 200px;">
                        <nuxt-link :to="`/teams/${match.homeTeam.id}`">
                          {{ match.homeTeam.name }}
                        </nuxt-link>
                      </div>
                      <div class="score" v-if="match.status === 'FINISHED'">
                        <nuxt-link :to="`/matches/${match.id}`">
                          <span v-if="match.status === 'FINISHED'">{{ match.score.fullTime.homeTeam }}</span>
                          -
                          <span v-if="match.status === 'FINISHED'">{{ match.score.fullTime.awayTeam }}</span>
                        </nuxt-link>
                      </div>
                      <div v-else class="mx-2"> - </div>
                      <div class="text-left" style="width: 200px;">
                        <nuxt-link :to="`/teams/${match.awayTeam.id}`">
                          {{ match.awayTeam.name }}
                        </nuxt-link>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- list players -->
          <div id="players" :class="{ 'active': type === 'players' }" class="tab-pane fade in">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Birth Date</th>
                  <th>Number</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="player in team.squad" :key="player.id">
                  <td>
                    {{ player.countryOfBirth }}
                  </td>
                  <td>
                    <nuxt-link :to="`/players/${player.id}`">
                      {{ player.name }}
                    </nuxt-link>
                  </td>
                  <td>
                    {{ $moment(player.dateOfBirth).format('YYYY-MM-DD') }}
                  </td>
                  <td>
                    {{ player.shirtNumber }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      team: null,
      matches: null,
      type: 'fixtures',
    }
  },
  async mounted () {
    try {
      let resTeam = await this.$axios.get(`teams/${this.$route?.params?.id}`);
      this.team = resTeam.data;
      let resMatchs = await this.$axios.get(`teams/${this.team.id}/matches/`);
      this.matches = resMatchs.data.matches;
    } catch (error) {
      console.log(error);
    }
  }
}
</script>