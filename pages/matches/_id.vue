<template>
  <div class="matches-detail row">
    312123213
  </div>
</template>
<script>
export default {
  data() {
    return {
      match: null,
    }
  },
  async mounted () {
    try {
      let res = await this.$axios.get(`matches/${this.$route?.params?.id}`);
    } catch (error) {
      console.log(error);
    }
  }
}
</script>