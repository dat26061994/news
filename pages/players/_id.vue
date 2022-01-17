<template>
  <div>
    123
  </div>
</template>
<script>
export default {
  data() {
    return {
      player: null,
    }
  },
  async mounted () {
    try {
      let res = await this.$axios.get(`players/${this.$route?.params?.id}`);
    } catch (error) {
      console.log(error);
    }
  }
}
</script>