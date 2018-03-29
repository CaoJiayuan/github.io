<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs1 :key="i" v-for="i in 128">
        <v-card :class="randomClass()" class="reveal" style="height: 256px;"></v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        colors : ['grey', 'white', 'black', 'pink', 'purple', 'yellow', 'blue', 'green', 'cyan'],
        shades : ['lighten-1', 'lighten-2', 'darken-1', 'darken2']
      }
    },
    components: {},
    methods: {
      randomEle (array) {
        let index = Math.floor((Math.random() * array.length))
        return array[index]
      },
      randomClass(){
        return this.randomEle(this.colors) + ' ' + this.randomEle(this.shades)
      }
    },
    mounted () {
      let rv = new ScrollReveal({duration: 1000, delay: 50, distance: '10rem', scale: 1})
      rv.reveal('.reveal', 20)
    },
    created () {

    },

  }
</script>
