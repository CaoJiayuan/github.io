<template>
  <v-toolbar :dense="topMin" :style="{ opacity : topMin ? .75 : 1 }" app :fixed="topMin" :color="theme.color" :dark="theme.dark" tabs class="top-bar">
    <v-toolbar-title>Just for fun!</v-toolbar-title>
    <v-spacer></v-spacer>

    <v-tabs centered :color="theme.color" :slot="!topMin ? 'extension' : undefined" slider-color="yellow"
            v-model="tab">
      <v-tab v-for="t in tabs" :key="t.id" @click="gotoPage(t)" :href="`#tab-${t.id}`">
        {{ t.title }}
      </v-tab>
    </v-tabs>

    <v-btn icon>
      <v-icon>search</v-icon>
    </v-btn>
    <v-btn icon>
      <v-icon>more_vert</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script>
  const mapGetters = Vuex.mapGetters

  export default {
    data () {
      return {
        tab: 'tab-home',
        tabs: [
          {
            id: 'home',
            title: 'Home'
          },
          {
            id: 'about',
            title: 'About'
          }
        ]
      }
    },
    computed: {
      ...mapGetters({
        theme: 'theme',
        topMin: 'topMin',
      }),
    },
    components: {},
    methods: {
      gotoPage (tab) {
        this.$router.push(tab.id)
      }
    },
    mounted () {
    },
    created () {

    }
  }
</script>
<style scoped lang="sass">

</style>
