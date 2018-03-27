<template>
  <div :id="id">
    <v-app>
      <v-content :class="theme.background">
        <v-toolbar :color="theme.color" :dark="theme.dark" tabs>
          <v-toolbar-title>Just for fun!</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon>
            <v-icon>search</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon>more_vert</v-icon>
          </v-btn>
          <v-tabs centered :color="theme.color" slot="extension" slider-color="yellow"
                  v-model="tab">
            <v-tab v-for="t in tabs" :key="t.id" @click="gotoPage(t)" :href="`#tab-${t.id}`">
              {{ t.title }}
            </v-tab>
          </v-tabs>
        </v-toolbar>
        <v-card flat>
          <transition name="slide" mode="out-in">
            <router-view></router-view>
          </transition>
        </v-card>
        <div style="width: 100%;height: 52px;"></div>
      </v-content>
      <mfooter></mfooter>
    </v-app>
    <toast></toast>
  </div>
</template>

<script>

  import Toast from './components/Toast.vue'
  import Mfooter from './components/layouts/Footer.vue'

  const mapGetters = Vuex.mapGetters
  export default {
    name: 'App',
    data () {
      return {
        msg: 'hello',
        id: window.id,
        tab: 'tab-home',
        tabs : [
          {
            id : 'home',
            title : 'Home'
          },
          {
            id : 'about',
            title : 'About'
          }
        ]
      }
    },
    components: {Toast, Mfooter},
    computed: {
      ...mapGetters({
        theme: 'theme'
      })
    },
    mounted () {
    },
    methods:{
      gotoPage(tab){
        this.$router.push(tab.id)
      }
    }
  }
</script>

<style>

</style>
