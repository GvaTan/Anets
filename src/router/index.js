import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home'
import Detail from '../components/Detail'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [

    {path: '/',name: 'home',components: {
       home:Home
       },children:[
        {
          path: 'common', name: 'common', components: {
           common: Detail
          }
        }

      ]},
    {
      path: '/settings/history', name: 'history', components: {
        history: ()=>import('../components/History.vue')
      }
    },
    {
      path: '/settings/clock', name: 'clock', components: {
        clock: ()=>import('../components/Settings/Alarm.vue')
      }
    },
    {
      path: '/query', name: 'query', components: {
        query: ()=>import('../components/query/Query.vue')
      }
    }
  ]
})
