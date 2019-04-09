import Vue from 'vue'
Vue.mixin({
  methods:{
    addPath(url) {
      console.log('localhost:3000' + url)
      return 'http://192.168.200.70:3000' + url
    }
  }
})