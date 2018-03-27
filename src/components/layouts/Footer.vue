<template>
  <v-footer app :color="theme.color" :dark="theme.dark" class="footer">
    <v-spacer></v-spacer>
    <div :style="{color:color}">© {{ new Date().getFullYear() }} {{ site }}</div>
    <v-spacer></v-spacer>
    <v-btn v-for="(t, index) in themes" :key="index" :color="t.color" :dark="t.dark"
           small bottom right fab
           @click="changeTheme({color: t.color, dark : t.dark, background: t.background})">
    </v-btn>
  </v-footer>
</template>

<script>
  import { SITE } from '../../constant'

  const mapMutations = Vuex.mapMutations
  const mapGetters = Vuex.mapGetters
  export default {
    data () {
      return {
        site : SITE
      }
    },
    computed: {
      color () {
        return this.theme.color !== 'white' ? 'white' : 'black'
      },
      ...mapGetters({
        theme: 'theme',
        themes: 'themes',
      })
    },
    components: {},
    methods: {
      ...mapMutations({
        changeTheme: 'changeTheme'
      })
    },
    mounted () {

    },
    created () {

    },

  }
</script>
<style scoped lang="sass">
  .footer
    opacity: .65
  .footer:hover
    opacity: 1
</style>
