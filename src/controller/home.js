import uri from 'utils/uri'

function getData() {
  return new Promise((resolve,reject)=>{
    this.$get(uri.home).then(res=>{
      resolve(makeData(res))
    })
    .catch(err=>{
      reject(err)
    })
  })
}
/*
 dec 首页案件名称列表数据
 * 
 * */
function makeData(res) {
  return res
}
export {
  getData
}
