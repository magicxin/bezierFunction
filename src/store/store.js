import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import admin from './admin.js'

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    admin
  },
//strict: debug,
//plugins: debug ? [createLogger()] : []
})
