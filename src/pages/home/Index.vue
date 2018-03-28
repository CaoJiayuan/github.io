<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs2 :key="i" v-for="i in 6">
        <v-card class="grey lighten-1 reveal"  style="height: 128px;"></v-card>
      </v-flex>
      <v-flex xs2 :key="i" v-for="i in 6">
        <v-card class="green lighten-1 reveal"  style="height: 128px;"></v-card>
      </v-flex>
      <v-flex xs2 :key="i" v-for="i in 6">
        <v-card class="cyan lighten-1 reveal"  style="height: 128px;"></v-card>
      </v-flex>
      <v-flex xs2 :key="i" v-for="i in 6">
        <v-card class="blue lighten-1 reveal"  style="height: 128px;"></v-card>
      </v-flex>
      <v-flex xs2 :key="i" v-for="i in 6">
        <v-card class="yellow lighten-1 reveal"  style="height: 128px;"></v-card>
      </v-flex>
      <v-flex xs2 :key="i" v-for="i in 6">
        <v-card class="purple lighten-1 reveal"  style="height: 128px;"></v-card>
      </v-flex>
      <v-flex xs2 :key="i" v-for="i in 6">
        <v-card class="pink lighten-1 reveal"  style="height: 128px;"></v-card>
      </v-flex>
      <v-flex xs2 :key="i" v-for="i in 6">
        <v-card class="black lighten-1 reveal"  style="height: 128px;"></v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {}
    },
    components: {},
    methods: {},
    mounted () {
      let rv = new ScrollReveal({ duration: 1000, delay: 50,distance: '10rem',scale:1})
      rv.reveal('.reveal', 20)
    },
    created () {

    },

  }
</script>
