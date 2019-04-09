import Vue from 'vue'

//Vue.$mock.mock('/search/caseTypeList',  'get',   {  
//'errorCode':  200,
//  'data|5':  [{
//  title: '@ctitle',
//  'children|4-10': [
//    '@ctitle(4,10)'
//  ]
//}],
//  'errorMessage':   'success'
//})
Vue.$mock.mock('/search/home',  'get',   {  
  'errorCode':  200,
    'data':  {
      person: {
        name: 'magix'
      }
    },
    'errorMessage':   'success'
})
