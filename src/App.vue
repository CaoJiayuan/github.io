<template>
  <div :id="id">
    <v-app>
      <h1 class="text-xs-center">Hello World</h1>
    </v-app>
    <toast></toast>
  </div>
</template>

<script>

  import Toast from './components/Toast.vue';
  import TopBar from './components/layouts/TopBar.vue';
  import Navigation from './components/layouts/Navigation.vue';
  import Mfooter from './components/layouts/Footer.vue';
  import {LOGIN_PATH} from './constant';
  const mapGetters = Vuex.mapGetters;
  export default {
    name: 'App',
    data () {
      return {
        msg: 'hello',
        id: window.id
      }
    },
    components: {Toast, TopBar, Navigation, Mfooter},
    computed:{
      isLogin() {
        return this.$route.path === LOGIN_PATH;
      },
      ...mapGetters({
        theme: 'theme'
      })
    },
    mounted () {
    }
  }
</script>

<style>

</style>
