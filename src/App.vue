<template>
  <div :id="id">
    <v-app>
      <top-bar></top-bar>
      <v-content class="content" :class="theme.background" v-scroll="onScroll">
        <transition name="slide" mode="out-in">
          <router-view></router-view>
        </transition>
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
  import TopBar from './components/layouts/TopBar.vue'

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
        ],
      }
    },
    components: {Toast, Mfooter, TopBar},
    computed: {
      ...mapGetters({
        theme: 'theme'
      }),
      topMin:{
        get(){
          return this.$store.getters.topMin;
        },
        set(v){
          this.$store.commit('minTop', v);
        }
      }
    },
    mounted () {
    },
    methods:{
      gotoPage(tab){
        this.$router.push(tab.id)
      },
      onScroll(){
        this.topMin = window.pageYOffset > 64;
      }
    }
  }
</script>

<style scoped lang="sass">
.content
  min-height: 768px
</style>
